
const readline = require('readline'); 
const { stdin: input, stdout: output } = require('process');
const { userInfo } = require('os');
const rl = readline.createInterface({ input, output });

const userData = [
  {
    name: 'ram',
    amount: 150,
    city: 'mumbai',
    mo_no: '1234567890',
  },
  {
    name: 'sonu',
    amount: 500,
    city: 'pune',
    mo_no: '1234568899',
  },
];

const services = ['user', 'create account'];

const userInfos = (user) => {
  rl.question('please provide Username \n ', (username) => {
    user(username);
  });
};

const debit = (userPersonalInfo) => {
  rl.question('please write amount to Debit  \n', (deb) => {
    // const x=Number(deb)
    if (deb > userPersonalInfo[0].amount) {
      console.log('\n not sufficient Fund!! \n');
      debit(userPersonalInfo);
    } else {
      userPersonalInfo[0].amount = userPersonalInfo[0].amount - deb;

      console.log(`\n amout of Rs ${deb} is debited from your account \n remaining balance : Rs ${userPersonalInfo[0].amount}
            \n //`);
      console.table(userPersonalInfo);
      console.log('\n  Thank You For Visiting HDFC_BANK  \n //');
      rl.close();
    }
  });
};

const credit = (userPersonalInfo) => {
  rl.question('enter amount to be credited \n', (amt) => {
    userPersonalInfo[0].amount = userPersonalInfo[0].amount + Number(amt);
    console.log(`\n amout of Rs ${amt} is credited into your account \n new  balance : Rs ${userPersonalInfo[0].amount}
        \n //`);
    console.table(userPersonalInfo);

    console.log('\n Thank You For Visiting HDFC_BANK  \n //');
    rl.close();
  });
};

const debcred = (userPersonalInfo) => {
  (() => {
    console.table(userPersonalInfo);
    rl.question('do you want to Debit/Credit amount y/n \n', (answer) => {
      if (answer == 'y') {
        rl.question('1 for Debit , 2 for credit \n', (answer) => {
          if (answer == 1) {
            debit(userPersonalInfo);
          } else if (answer == 2) {
            credit(userPersonalInfo);
          } else {
            console.log('please select correct option !! \n');
            debcred(userPersonalInfo);
          }
        });
      } else rl.close();
    });
  })();
};

const createUser = (usr) => {
  rl.question('Enter full name your name (sir name first) \n', (nam) => {
    rl.question('how much amount Do you want to add \n', (amt) => {
      rl.question('where are you from (city name)? \n', (place) => {
        rl.question('mo_no \n', (phone) => {
          let data = {
            name: nam,
            amount: Number(amt),
            place: place,
            phone: phone,
          };
          usr(data);
        });
      });
    });
  });
};

const serviceOption = () => {
  console.table(services);
  rl.question(
    'WElCOME TO HDFC_BANK !!! please Choose Services \n',
    (ser) => {
      if (ser == 0) {
        userInfos((user) => {
          let i = 0;
          const userPersonalInfo = userData.filter((item) => {
            return item.name == user;
          });

          userPersonalInfo.length >= 1
            ? debcred(userPersonalInfo)
            : (() => {
                console.log('user not found \n');
                rl.close();
              })();
        });
      } else if (ser == 1) {
        createUser((usr) => {
          userData.push(usr);
          console.log('\n \n user has been added \n \n ');
          console.table(userData);
          console.log('Thaks for visit HDFC_BANK');
          rl.close();
        });
      } else {
        console.log('please choose correct option \n');
        serviceOption();
      }
    }
  );
};

const HDFC_BANK = () => {
  serviceOption();
};

HDFC_BANK();

