const mongoose = require("mongoose");

const obatSchema = new mongoose.Schema({
	nama_obat: {
		type: String,
		required: true,
		trim: true,
	},
	kemasan: {
		type: String,
		required: true,
		trim: true,
	},
	pemberian: {
		type: String,
		required: true,
		trim: true,
	},
	no_seri: {
		type: String,
		required: true,
		trim: true,
	},
	status: {
		type: String,
		required: true,
		trim: true,
	},

	tgl_masuk: {
		type: Date,
		default: Date.now,
		required: true,
		trim: true,
	},

	jumlah: {
		type: Number,
		required: true,
		trim: true,
	},
});

const Obat = mongoose.model("Obat", obatSchema);

module.exports = Obat;
