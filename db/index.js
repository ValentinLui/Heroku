const fs = require('fs');
const config = require('./../config');

let cellPhones = require('./cellphones') || [];

module.exports =
{
    getPhones: () => cellPhones,

    getPhoneById: id => cellPhones.find(phone => phone.id === Number(id)),

    addPhone(fields)
    {
        const {surname, number} = fields;
        if (!surname || !number)
        {
            throw new Error('Empty surname or number fields');
        }
        const newPhone =
        {
            id: cellPhones.length,
            surname,
            number
        };
        cellPhones.push(newPhone);
        save();
        return newPhone;
    },

    updatePhone(fields)
    {
        const {id, surname, number} = fields;
        if (!id || !surname || !number)
        {
            throw new Error('Empty id, fullName or phone fields');
        }
        let targetPhone = cellPhones.find(phone => phone.id === Number(id));
        if (!targetPhone)
        {
            throw new Error('Invalid record id');
        }
        targetPhone.surname = surname;
        targetPhone.number = number;
        save();
        return targetPhone;
    },

    deletePhone(id)
    {
        let targetPhone = cellPhones.find(phone => phone.id !== Number(id));
        if (!targetPhone)
        {
            throw new Error('Invalid record id');
        }
        cellPhones = cellPhones.filter(phone => phone.id !== Number(id));
        save();
        return targetPhone;
    }
};

function save()
{
    fs.writeFile(__dirname + config.db.cellPhonesDataPath, JSON.stringify(cellPhones, null, '  '), err =>
    {
        if (err)
        {
            throw err;
        }
    });
}
