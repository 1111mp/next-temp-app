import './mailer.worker';
import { mailerQueue } from './mailer.queue';

import type { SendMailOptions } from 'nodemailer';

export const sendMail = ({
  to,
  subject,
  text,
  html,
  attachments,
  ...opts
}: SendMailOptions) => {
  return mailerQueue.add('mailer', {
    to,
    subject,
    text,
    html,
    attachments,
    ...opts,
  });
};
