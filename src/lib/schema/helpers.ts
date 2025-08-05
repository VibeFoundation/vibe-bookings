import * as v from "valibot";

export const rolesSchema = v.picklist(["member", "admin", "member"]);

export const serviceTypeSchema = v.picklist([
	"pedicure",
	"manicure",
	"nail_extension",
	"hair_extension",
	"hair_braiding",
	"hair_dyeing",
	"hair_cutting",
	"makeup",
	"shinion",
	"eyelash_extension",
	"brow_micro_blading",
	"lip_shading",
	"piercing",
	"tattoo",
	"laser",
	"waxing",
]);
