import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that verifies the JWT signature and extracts user payload.
 * It uses the 'jwt' Passport strategy under the hood.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
