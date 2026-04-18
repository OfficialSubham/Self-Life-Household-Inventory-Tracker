ALTER TABLE "items" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "status" SET DEFAULT 'fresh'::text;--> statement-breakpoint
DROP TYPE "public"."status_enum";--> statement-breakpoint
CREATE TYPE "public"."status_enum" AS ENUM('fresh', 'expiring-soon', 'expired', 'used', 'wasted');--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "status" SET DEFAULT 'fresh'::"public"."status_enum";--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "status" SET DATA TYPE "public"."status_enum" USING "status"::"public"."status_enum";