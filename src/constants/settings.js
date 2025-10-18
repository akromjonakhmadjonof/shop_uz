import LoginFields from 'components/Pages/Settings/fields/LoginFields';
import PasswordFields from 'components/Pages/Settings/fields/PasswordFields';
import NotificationFields from 'components/Pages/Settings/fields/NotificationFields';
import ContactFields from 'components/Pages/Settings/fields/ContactFields';
import DeleteFields from 'components/Pages/Settings/fields/DeleteFields';

export const settings = [
	{
		id:0,
		text:'account_information',
		fields:<LoginFields/>,
	},
	{
		id:1,
		text:'change_password',
		fields:<PasswordFields/>,
	},
	{
		id:2,
		text:'notification_settings',
		fields:<NotificationFields/>,
	},
	{
		id:3,
		text:'contact_settings',
		fields:<ContactFields/>,
	},
	// {
	// 	id: 4,
	// 	text: 'banner_settings',
	// 	fields: <BannerFields />
	// },
	{
		id:5,
		text:'delete_account',
		fields:<DeleteFields/>,
	},
];
