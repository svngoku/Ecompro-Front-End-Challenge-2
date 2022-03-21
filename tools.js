const ObjectsToCsv = require('objects-to-csv');

CreateCsv = async (list) => {
    let csv_file = new ObjectsToCsv(list)
    await csv_file.toDisk('./datas/list.csv', { append: true });
};

exports.CreateCsv = CreateCsv;


