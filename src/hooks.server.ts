import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const GUEST_PATHS = ['/login', '/signup'];

function isGuestPath(pathname: string): boolean {
	return GUEST_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;
	const token = event.cookies.get('token');
	const accept = event.request.headers.get('accept') ?? '';
	const isHtmlNavigation = accept.includes('text/html');

	if (path.startsWith('/_') || path.startsWith('/favicon')) {
		return resolve(event);
	}

	if (!token && !isGuestPath(path)) {
		if (isHtmlNavigation) {
			throw redirect(303, '/login');
		}
		return resolve(event);
	}

	if (token && isGuestPath(path) && isHtmlNavigation) {
		throw redirect(303, '/');
	}

	return resolve(event);
};
