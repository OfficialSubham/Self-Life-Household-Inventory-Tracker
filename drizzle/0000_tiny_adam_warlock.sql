CREATE TYPE "public"."category_enum" AS ENUM('other', 'produce', 'dairy', 'meat', 'pantry', 'frozen');--> statement-breakpoint
CREATE TYPE "public"."status_enum" AS ENUM('fresh', 'expirign-soon', 'expired', 'used', 'wasted');--> statement-breakpoint
CREATE TABLE "household" (
	"_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "household__id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"invite_code" varchar(255) NOT NULL,
	"waste_score" integer DEFAULT 0,
	CONSTRAINT "household_invite_code_unique" UNIQUE("invite_code"),
	CONSTRAINT "waste_score_check" CHECK ("household"."waste_score" >= 0 AND "household"."waste_score" <= 100)
);
--> statement-breakpoint
CREATE TABLE "items" (
	"_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "items__id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"household_id" integer NOT NULL,
	"added_by" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"category" "category_enum" DEFAULT 'other',
	"expiry_date" timestamp,
	"status" "status_enum" DEFAULT 'fresh',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users__id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"household_id" integer,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_household_id_household__id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."household"("_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_added_by_users__id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_household_id_household__id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."household"("_id") ON DELETE no action ON UPDATE no action;