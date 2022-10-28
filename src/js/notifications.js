import { alert, error } from '@pnotify/core';

const notification = type => {
  type === 'alert'
    ? alert({
        text: 'Уточните запрос. Слишком много сповпадений!',
        delay: 1500,
      })
    : error({
        text: `Такой страны нет!`,
        delay: 1500,
      });
};

export default notification;
