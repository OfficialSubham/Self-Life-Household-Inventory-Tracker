import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { Household, Items, Users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST() {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        await transporter.verify();
        const houses = await db.select().from(Household);
        for (const room of houses) {
            const users = await db
                .select()
                .from(Users)
                .where(eq(Users.householdId, room._id));
            const expiringSoonItems = await db
                .select()
                .from(Items)
                .where(
                    and(
                        eq(Items.householdId, room._id),
                        eq(Items.status, "expiring-soon"),
                    ),
                );
            const expiredItems = await db
                .select()
                .from(Items)
                .where(and(eq(Items.householdId, room._id), eq(Items.status, "expired")));
            const mailOptions = {
                from: process.env.EMAIL,
                subject: "Food Expiry Alert",
                html: `
                    <h2>Food Expiry Alert</h2>

                    <p>The following items have already expired:</p>
                    <ul>
                    ${expiredItems.map((item) => `<li>${item.name}</li>`).join("")}
                    </ul>

                    <p>The following items will expire within the next few days:</p>
                    <ul>
                    ${expiringSoonItems.map((item) => `<li>${item.name}</li>`).join("")}
                    </ul>

                    <p>Please review these items as soon as possible.</p>

                    <p>Food Inventory Management Team</p>
                `,
            };
            if (expiredItems.length >= 1 || expiringSoonItems.length >= 1)
                for (const user of users) {
                    await transporter.sendMail({
                        ...mailOptions,
                        to: user.email,
                    });
                }
        }

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 500,
            },
        );
    }
}
