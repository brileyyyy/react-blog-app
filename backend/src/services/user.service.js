import bcrypt from 'bcrypt'
import User from '../models/User.js';
import lodash from 'lodash';
const {omit} = lodash

class UserService {
    async comparePassword({email, password}) {
        const user = await User.findOne({email})
        if (!user) return false

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return false

        return omit(user.toJSON(), 'password')
    }
}

export default new UserService()