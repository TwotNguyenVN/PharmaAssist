import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private prisma: PrismaService) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be defined in env variables');
    }

    this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const { session, user } = data;

    if (!session || !user) {
      throw new UnauthorizedException('Authentication failed');
    }

    // Fetch local user profile and roles
    const userProfile = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!userProfile) {
      throw new UnauthorizedException('User profile not found in system database.');
    }

    if (userProfile.status !== 'ACTIVE') {
      throw new UnauthorizedException('User account is currently inactive.');
    }

    const roles = userProfile.userRoles.map((ur) => ur.role.name);

    return {
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      user: {
        id: userProfile.id,
        email: userProfile.email,
        fullName: userProfile.fullName,
        roles,
      },
    };
  }
}
