/* Models */
const Entry = require("../models/Entry").Entry;

const removeEntry = (req, res) => {
	const { slug } = req.params;

	/* Check if the entry exists */
	Entry.fetchOne(slug, (err, row) => {
		if (err) console.error(err.message);
		if (!row) {
			res.status(404).json({ message: "Entry not found." });
			return;
		}
		/* Delete the entry if it exists and redirect to homepage */
		Entry.delete(slug, (err) => {
			if (err) console.error(err.message);
			res.redirect(`/api/v1`);
		});
	});
};

/* Exports */
module.exports = {
	removeEntry,
};
