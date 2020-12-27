const mongoose = require("mongoose")

const alkesSchema = new mongoose.Schema({
	nama_alkes: {
		type: String,
		required: true,
		trim: true,
	},
	merek: {
		type: String,
		required: true,
		trim: true,
	},
	ruang: {
		type: String,
		required: true,
		trim: true,
	},
	kondisi: {
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
		required: true,
		trim: true,
	},

	jumlah: {
		type: Number,
		required: true,
		trim: true,
	},
});

const Alkes = mongoose.model("Alkes", alkesSchema);

module.exports = Alkes;
