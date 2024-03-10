const userService = require('../service/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req) //валидация тела запроса
            if (!errors.isEmpty()) { 
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body // получаем из тела запроса нужные данные
            const userData = await userService.registration(email, password) // вызываем функцию регистрации, передавая ей email и пароль
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) //сохраняем в cookie refresh токен
            return res.json(userData) // возвращаем на клиент данные о пользователе
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body // получаем пароль и email из запроса
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // добавляем refresh в cookie
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies // достаем refreshToken из cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken') // очищаем cookies
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link // получаем ссылку из строки запроса
            await userService.activate(activationLink) // вызываем ф-ию, передаем ссылку
            return res.redirect(process.env.CLIENT_URL) // редирект на клиент
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
}


module.exports = new UserController();
