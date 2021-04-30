import React, {Component} from 'react';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'TestDataB.db'});
export default class Database extends Component {
  constructor(props) {
    super(props);

    componentDidMount = () => {
      db.transaction(txn => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
          [],
          (txn, res) => {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS table_user', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20),user_surname VARCHAR(255),user_email VARCHAR(255),user_dob INT(10),user_address VARCHAR(255),user_gender VARCHAR(2),user_phonecode INT(2), user_contact INT(10),user_Rescountry VARCHAR(255),user_concountry VARCHAR(255))',
                [],
              );
            }
          },
        );
      });
    };
  }
}
