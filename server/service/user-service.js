const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email}) //есть ли пользователь с таким email в коллекции
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`) // если email найден, пробрасываем ошибку
        }
        const hashPassword = await bcrypt.hash(password, 3) //хэшируем пароль при помощи bcrypt
        const activationLink = uuid.v4() // генерируем ссылку для активации

        const user = await UserModel.create({email, password: hashPassword, activationLink}) // создаем пользователя 
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`) // отправляем ссылку для регистрации

        const userDto = new UserDto(user) 
        const tokens = tokenService.generateTokens({...userDto}) // генерация токена
        await tokenService.saveToken(userDto.id, tokens.refreshToken) // сохраняем токен, созданный с помощью ф-ии из token-service

        return {...tokens, user: userDto}
    }

    async activate(activationLink) { // передаем ссылку, по которой переходит пользователь
        const user = await UserModel.findOne({activationLink}) // ищем пользователя по переданной ссылке
        if (!user) { // если нет юзера с такой ссылкой
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true // ссылка активирована
        await user.save() // 
    }

    async login(email, password) {
        const user = await UserModel.findOne({email}) // ищем пользователя с переданным email
        if (!user) { 
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password) // сравниваем хэшируемый пароль с паролем из запроса
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken) // удаляем токен
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

}

module.exports = new UserService();
