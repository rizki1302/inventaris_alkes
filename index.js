const express = require("express");
const moment = require("moment");
const app = express();
const port = process.env.PORT;
require("./src/db/index");
const Alkes = require("./src/db/models/alkes");
const Obat = require("./src/db/models/obat");
app.use(express.json());

app.post("/alkes", async (req, res) => {
	try {
		const alkes = await new Alkes(req.body);

		// pengguna.tanggallahir = new Date(`${test[2]},${test[1]-1},${test[0]}`)
		alkes.save();
		if (!alkes) {
			throw new Error();
		}

		res.status(200).send(alkes);
	} catch (error) {
		res.status(404).send(error);
	}
});

app.get("/alkes/:id", async (req, res) => {
	try {
		const alkes = await Alkes.findOne({ _id: req.params.id });
		res.send(alkes);
	} catch (e) {
		res.status(500).send();
	}
});

app.get("/alkes", async (req, res) => {
	try {
		let syarat = {};
		if (req.query.bulan) {
			// syarat.bulan = req.query.bulan;
			let bulan = req.query.bulan;
			if (bulan < 10) {
				bulan = "0" + bulan;
			} else {
				bulan = bulan.toString();
			}

			let tahun = req.query.tahun;
			if (req.query.bulan !== 2) {
				syarat.bulan = {
					$gte: ISODate(`${tahun}-${bulan}-30T00:00:00.000Z`),
					$lt: ISODate(`${tahun}-${bulan}-01T00:00:00.000Z`),
				};
			} else {
				syarat.bulan = {
					$gte: ISODate(`${tahun}-${bulan}-28T00:00:00.000Z`),
					$lt: ISODate(`${tahun}-${bulan}-01T00:00:00.000Z`),
				};
			}
		}

		const alkes = await Alkes.find(syarat);

		if (!alkes) {
			throw new Error("alkes tidak ditemukan");
		}

		res.status(200).send(alkes);
	} catch (error) {
		res.status(404).send(error);
	}
});

app.get("/report-alkes", async (req, res) => {
	try {
		let syarat = {};
		if (req.query.tgl_start && req.query.tgl_end) {
			// syarat.bulan = req.query.bulan;
			let tgl_start = req.query.tgl_start;
			let tgl_end = req.query.tgl_end;
			let obj_start = moment(tgl_start);
			let obj_end = moment(tgl_start);

			syarat.tgl_masuk = {
				$gte: ISODate(`${obj_start.format("YYYY-MM-DD")}-30T00:00:00.000Z`),
				$lt: ISODate(`${obj_end.format("YYYY-MM-DD")}-01T00:00:00.000Z`),
			};
		}

		const alkes = await Alkes.find(syarat);

		if (!alkes) {
			throw new Error("alkes tidak ditemukan");
		}

		res.status(200).send(alkes);
	} catch (error) {
		res.status(404).send(error);
	}
});

app.patch("/alkes/:id", async (req, res) => {
	try {
		const alkes = await Alkes.findByIdAndUpdate(req.params.id, req.body);
		if (!alkes) {
			throw new Error();
		}

		res.status(200).send(req.body);
	} catch (error) {
		res.status(404).send();
	}
});

app.delete("/alkes/:id", async (req, res) => {
	try {
		const alkes = await Alkes.findOne({ _id: req.params.id });
		alkes.remove();
		res.send(alkes);
	} catch (e) {
		res.status(500).send();
	}
});

app.post("/obat", async (req, res) => {
	try {
		const obat = await new Obat(req.body);

		// pengguna.tanggallahir = new Date(`${test[2]},${test[1]-1},${test[0]}`)
		obat.save();
		if (!obat) {
			throw new Error("gagal tambah data");
		}

		res.status(200).send(obat);
	} catch (error) {
		res.status(404).send(error);
	}
});

app.get("/obat/:id", async (req, res) => {
	try {
		const obat = await Obat.findOne({ _id: req.params.id });
		res.send(obat);
	} catch (e) {
		res.status(500).send();
	}
});

app.get("/obat", async (req, res) => {
	try {
		let syarat = {};
		if (req.query.bulan) {
			// syarat.bulan = req.query.bulan;
			let bulan = req.query.bulan;
			if (bulan < 10) {
				bulan = "0" + bulan;
			} else {
				bulan = bulan.toString();
			}

			let tahun = req.query.tahun;
			if (req.query.bulan !== 2) {
				syarat.tgl_masuk = {
					$gte: ISODate(`${tahun}-${bulan}-30T00:00:00.000Z`),
					$lt: ISODate(`${tahun}-${bulan}-01T00:00:00.000Z`),
				};
			} else {
				syarat.tgl_masuk = {
					$gte: ISODate(`${tahun}-${bulan}-28T00:00:00.000Z`),
					$lt: ISODate(`${tahun}-${bulan}-01T00:00:00.000Z`),
				};
			}
		}

		const obat = await Obat.find(syarat);

		if (!obat) {
			throw new Error("obat tidak ditemukan");
		}

		res.status(200).send(obat);
	} catch (error) {
		res.status(404).send(error);
	}
});

app.patch("/obat/:id", async (req, res) => {
	try {
		const obat = await Obat.findByIdAndUpdate(req.params.id, req.body);
		if (!obat) {
			throw new Error();
		}

		res.status(200).send(req.body);
	} catch (error) {
		res.status(404).send();
	}
});

app.delete("/obat/:id", async (req, res) => {
	try {
		const obat = await Obat.findOne({ _id: req.params.id });
		obat.remove();
		res.send(obat);
	} catch (e) {
		res.status(500).send();
	}
});

app.get("/report-obat", async (req, res) => {
	try {
		let syarat = {};
		if (req.query.tgl_start && req.query.tgl_end) {
			// syarat.bulan = req.query.bulan;
			let tgl_start = req.query.tgl_start;
			let tgl_end = req.query.tgl_end;
			let obj_start = moment(tgl_start);
			let obj_end = moment(tgl_start);

			syarat.tgl_masuk = {
				$gte: ISODate(`${obj_start.format("YYYY-MM-DD")}-30T00:00:00.000Z`),
				$lt: ISODate(`${obj_end.format("YYYY-MM-DD")}-01T00:00:00.000Z`),
			};
		}

		const obat = await Obat.find(syarat);

		if (!obat) {
			throw new Error("obat tidak ditemukan");
		}

		res.status(200).send(obat);
	} catch (error) {
		res.status(404).send(error);
	}
});

app.listen(port, () => {
	console.log(`your program running on port ${port}`);
});
