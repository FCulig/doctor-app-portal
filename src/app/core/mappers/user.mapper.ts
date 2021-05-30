import { User } from "../models/user";

export class UserMapper {
    mapLoginResponseToUser(userResponse): User {
        const user = userResponse.user;
        const token = userResponse.tokens.access.token;
        return {
            id: user.id,
            role: user.role,
            token: token,
            createdAt: user.createdAt,
            isRegistrationComplete: user.isRegistrationComplete,
            isVerified: user.isVerified,
            phone: user.phone,
            updatedAt: user.updatedAt,
            attachments: user.attachments,
            city: user.city,
            dateOfBirth: user.dateOfBirth,
            dateOfGraduation: user.dateOfGraduation,
            earnings: user.earnings,
            email: user.email,
            emergencyContact: user.emergencyContact,
            firstname: user.firstname,
            gender: user.gender,
            lastname: user.lastname,
            licenseNumber: user.licenseNumber,
            profileImage: user.profileImage
        };
    }
}
