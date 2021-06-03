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

    mapArrayResponse(usersResponse): User[] {
        let users = [];

        usersResponse.forEach(user => {
            users.push({
                id: user.id,
                role: user.role,
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
            });
        });

        return users;
    }

    mapUserResponseToUser(userResponse): User {
        return {
            id: userResponse.id,
            role: userResponse.role,
            createdAt: userResponse.createdAt,
            isRegistrationComplete: userResponse.isRegistrationComplete,
            isVerified: userResponse.isVerified,
            phone: userResponse.phone,
            updatedAt: userResponse.updatedAt,
            attachments: userResponse.attachments,
            city: userResponse.city,
            dateOfBirth: userResponse.dateOfBirth,
            dateOfGraduation: userResponse.dateOfGraduation,
            earnings: userResponse.earnings,
            email: userResponse.email,
            emergencyContact: userResponse.emergencyContact,
            firstname: userResponse.firstname,
            gender: userResponse.gender,
            lastname: userResponse.lastname,
            licenseNumber: userResponse.licenseNumber,
            profileImage: userResponse.profileImage
        };
    }
}
