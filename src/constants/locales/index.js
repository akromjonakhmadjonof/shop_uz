import navbar from './navbar';
import options from './options';
import footer from './footer';
import titles from './titles';
import paragraphs from './paragrpahs';
import tooltips from './tooltips';
import statics from './statics';
import form from './form';
import table from './table';
import text from './text';
import fields from './fields';
import messages from './messages';

export default {
	en:{
		translation:{
			...navbar.en,
			...form.en,
			...messages.en,
			...text.en,
			...fields.en,
			...options.en,
			...footer.en,
			...titles.en,
			...paragraphs.en,
			...tooltips.en,
			...statics.en,
			...table.en,
		},
	},
	ru:{
		translation:{
			...text.ru,
			...form.ru,
			...fields.ru,
			...navbar.ru,
			...options.ru,
			...footer.ru,
			...titles.ru,
			...paragraphs.ru,
			...tooltips.ru,
			...statics.ru,
			...messages.ru,
			...table.ru,
		},
	},
	uz:{
		translation:{
			...text.uz,
			...messages.uz,
			...navbar.uz,
			...form.uz,
			...options.uz,
			...footer.uz,
			...table.uz,
			...titles.uz,
			...paragraphs.uz,
			...fields.uz,
			...tooltips.uz,
			...statics.uz,
		},
	},
};
