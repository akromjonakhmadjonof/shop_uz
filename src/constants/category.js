import React from 'react';
import {
	Box,
	Briefcase,
	CloudLightning,
	Command,
	Dribbble,
	Gift,
	GitHub,
	Home,
	Layers,
	ShoppingBag,
	Truck,
	Watch
} from 'react-feather';
import * as PATH from 'location/routes';

export const category = [
	{
		id:0,
		label:'category_child',
		href:PATH.CATEGORY_BABY,
		icon:<Gift stroke={'#9696A0'}/>,
	},
	{
		id:1,
		label:'real_estate',
		href:PATH.CATEGORY_REAL_ESTATE,
		icon:<Home stroke={'#9696A0'}/>
	},
	{
		id:2,
		label:'transport',
		href:PATH.CATEGORY_TRANSPORT,
		icon:<Truck stroke={'#9696A0'}/>,
		children:[
			{
				id:0,
				label:'cars',
				value:'cars'
			},
			{
				id:1,
				label:'rent_car',
				value:'rent_car'
			},
			{
				id:2,
				label:'scooters',
				value:'scooters'
			}
		]
	},
	{
		id:3,
		label:'workplace',
		href:PATH.CATEGORY_WORKPLACE,
		icon:<Briefcase stroke={'#9696A0'}/>,
	},
	{
		id:4,
		label:'category_pets',
		href:PATH.CATEGORY_PETS,
		icon:<GitHub stroke={'#9696A0'}/>,
	},
	{
		id:5,
		label:'category_elector',
		href:PATH.CATEGORY_ELECTRIC_TOOLS,
		icon:<CloudLightning stroke={'#9696A0'}/>,
	},
	{
		id:6,
		label:'sport',
		href:PATH.CATEGORY_SPORT,
		icon:<Dribbble stroke={'#9696A0'}/>,
	},
	{
		id:7,
		label:'category_clothes',
		href:PATH.CATEGORY_CLOTHES,
		icon:<Watch stroke={'#9696A0'}/>,
	},
	{
		id:8,
		label:'services',
		href:PATH.CATEGORY_SERVICES,
		icon:<Command stroke={'#9696A0'}/>,
	},
	{
		id:9,
		label:'foods',
		href:PATH.CATEGORY_FOODS,
		icon:<ShoppingBag stroke={'#9696A0'}/>,
	},
	{
		id:10,
		label:'building_materials',
		href:PATH.CATEGORY_BUILDING_MATERIALS,
		icon:<Layers stroke={'#9696A0'}/>,
	},
	{
		id:11,
		label:'furniture',
		href:PATH.CATEGORY_FURNITURE,
		icon:<Box stroke={'#9696A0'}/>,
	}
];
