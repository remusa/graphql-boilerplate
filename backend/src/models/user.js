const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
    })

    User.associate = models => {
        User.hasMany(models.Message, { onDelete: 'CASCADE' })
    }

    User.findByLogin = async login => {
        let findUser = await User.findOne({
            where: { username: login },
        })

        if (!findUser) {
            findUser = await User.findOne({
                where: { email: login },
            })
        }

        return findUser
    }

    return User
}

export default user
