// Copyright (c) 2019, Frappe Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on("Event Sync Log", {
	refresh: function (frm) {
		if (["Failed", "Ignored"].includes(frm.doc.status)) {
			frm.add_custom_button(__("Resync"), function () {
				frappe.call({
					method: "event_streaming.event_streaming.doctype.event_producer.event_producer.resync",
					args: {
						update: frm.doc,
					},
					callback: function (r) {
						if (r.message) {
							frappe.msgprint(r.message);
							frm.set_value("status", r.message);
							frm.save();
						}
					},
				});
			});
		}
	},
});
