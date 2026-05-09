CREATE TYPE "public"."room_joining_status" AS ENUM('pending', 'succeed', 'rejected');--> statement-breakpoint
CREATE TABLE "room_join_status" (
	"_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "room_join_status__id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"joined_status" "room_joining_status" DEFAULT 'pending',
	"household_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "room_join_status" ADD CONSTRAINT "room_join_status_household_id_household__id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."household"("_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "room_join_status" ADD CONSTRAINT "room_join_status_user_id_users__id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("_id") ON DELETE no action ON UPDATE no action;