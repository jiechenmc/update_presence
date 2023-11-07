import { initializeApp } from 'firebase-admin/app';

import createSession from './session/create_session';
import joinSession from './session/join_session';
import modifySession from './session/modify_session';
import deleteSession from './session/delete_session';

initializeApp();

export const create_session = createSession;
export const join_session = joinSession;
export const modify_session = modifySession
export const delete_session = deleteSession;