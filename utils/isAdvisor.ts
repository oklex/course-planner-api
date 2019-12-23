import preAuthorizedEmails from '../constants/preAuthorizedEmails'

export const isAdvisor = (userEmail: string) => {
  console.log('emails: ',preAuthorizedEmails);
  console.log('user: ',userEmail)
  var returnValue: boolean = false
  preAuthorizedEmails.forEach(email => {
      console.log('checking...', email)
    if (email === userEmail) {
        console.log('this account is pre-authorized as an academic advisor')
        returnValue = true
    }
  });
  return returnValue;
};

export default isAdvisor;