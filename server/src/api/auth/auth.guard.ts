import { HttpError } from '../../lib/http-error';

export function AuthGuard(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        next(new HttpError(401, 'Unauthorized'));
    }
}
