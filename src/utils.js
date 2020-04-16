import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import jwt from 'jsonwebtoken';
import { sign } from 'crypto';

export const generateSecret = () => {
	const randomNumber = Math.floor(Math.random() * adjectives.length);
	return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
	const options = {
		auth: {
			api_user: process.env.SENDGRID_USERNAME,
			api_key: process.env.SENDGRID_PASSWORD
		}
	};
	const client = nodemailer.createTransport(sgTransport(options));
	return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
	const email = {
		from: 'jaiswalvishal86@gmail.com',
		to: address,
		subject: 'Login Secret for Instagram-Clone🔐',
		html: `<p>Hello User! Your login secret 🔑 is <b>${secret}</b>.<br/>Copy and paste it to the Instagram-Clone Application/Website to login🙂</p>`
	};
	return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
