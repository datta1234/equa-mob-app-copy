import React, { useEffect, useState } from 'react';

import CardIcon from 'assets/svgs/offsets/CardIcon';
import { isAfter } from 'date-fns';
import { Input } from 'react-native-elements';

// import { cache } from 'api/cache';
// import { GET_VIRTUAL_CART } from 'api/operations/queries/getVirtualCart';
import { RootContainer as ScreenContainer } from 'components/Containers';
import { ClickableText } from 'components/Typography';
import { scale } from 'constants/layout';
import { isProdEnv, testEmptyInputs } from 'utils/helpers';

import useOffsetNav from '../hooks/useOffsetNav';

import {
  FormWrapper,
  Row,
  ExpiryWrapper,
  CvcWrapper,
  HeaderIconSpacer,
  HeaderIconContainer,
  FooterContainer,
  PayButton,
  CancelButton,
} from './cardDetails.styles';
import InfoBox from './components/InfoBox';

// // TODO: update apollo to 3.5 and then use update function
// function cacheCardToCart({ cardholderName, cardNumber, expMonth, expYear }) {
//   cache.updateQuery({ query: GET_VIRTUAL_CART }, (data) => ({
//     cart: {
//       ...data.cart,
//       card: {
//         name: cardholderName,
//         last4: cardNumber.slice(cardNumber.length - 4),
//         expMonth,
//         expYear,
//       },
//     },
//   }));
// }

const cardHeight = scale(69);
function CardDetailsScreen({ navigation, loading, initiatePayment }) {
  const goTo = useOffsetNav();

  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  // delay button being enabled as subscriptions tend to take time to return a result
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (loading) {
      setDisabled(true);
    } else {
      setTimeout(() => {
        setDisabled(false);
      }, 3000);
    }
  }, [loading]);

  const values = { cardholderName, cardNumber, expiryDate, cvc };

  // const hasCvcDatePassed = moment(cvc).isBefore(new Date());

  const areInputsEmpty = testEmptyInputs(values);
  // const canGoNext = !areInputsEmpty;

  let nameError = '';
  let cardError = '';
  let expiryError = '';
  let cvvError = '';

  // checks for numbers
  function hasNumber(someString) {
    return /\d/.test(someString);
  }

  // checks for letters and/or '.'
  function hasLetters(someString) {
    return /\./.test(someString) || /[a-zA-Z]/.test(someString);
  }
  function isNumeric(someString) {
    return /^[0-9]+$/.test(someString);
  }

  // checks if month is 1-12 and if expiry has lapsed
  function validateExpiry() {
    if (expiryDate?.length > 2) {
      const expMo = expiryDate.split('/')[0];
      const expYr = expiryDate.split('/')[1];
      const expMoInt = Number(expMo, 10);
      const expYrInt = Number(expYr, 10) + 2000;
      const curYr = parseInt(new Date().getFullYear(), 10);
      const currentDate = new Date();
      const cardExpiryDate = new Date(expYrInt, expMoInt, 1);

      if (expMoInt > 12) {
        return 'Expiry month invalid';
      }

      if (expYr?.length > 0 && expYrInt + 2000 < curYr) {
        return 'Expiry year lapsed';
      }

      if (isAfter(currentDate, cardExpiryDate)) {
        return 'This card has expired';
      }
      if (isNaN(expMoInt) || isNaN(expYrInt)) {
        return 'Date not valid';
      }
    }
    return null;
  }

  // checks that card number is max 16 digits and is valid
  function validateCardNumber() {
    if (cardNumber?.length > 0) {
      if (hasLetters(cardNumber.replace(/\s+/g, ''))) {
        return 'Card number must have digits only';
      }

      let regex = new RegExp('^[0-9]{16}$');
      if (!regex.test(cardNumber.replace(/\s+/g, ''))) {
        return 'Card number must have 16 digits';
      }

      if (!luhnCheck(cardNumber.replace(/\s+/g, ''))) {
        return 'Card number is invalid';
      }
    }
    return null;
  }

  function luhnCheck(val) {
    let sum = 0;
    for (var i = 0; i < val.length; i++) {
      let intVal = parseInt(val.substr(i, 1), 10);
      if (i % 2 === 0) {
        intVal *= 2;
        if (intVal > 9) {
          intVal = 1 + (intVal % 10);
        }
      }
      sum += intVal;
    }
    return sum % 10 === 0;
  }

  function validateName() {
    if (hasNumber(cardholderName)) {
      return 'Name must be letters only';
    }
    return null;
  }

  function validateCVV() {
    if (!cvc) {
      return null;
    }
    return isNumeric(cvc) ? null : 'cvv must be numeric';
  }

  function handleCardNumber(number) {
    setCardNumber(
      number
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim(),
    );
  }

  nameError = validateName();
  cardError = validateCardNumber();
  expiryError = validateExpiry();
  cvvError = validateCVV();

  const canGoNext =
    !areInputsEmpty && !nameError && !cardError && !expiryError && !cvvError;

  function addToPosition(a, b, position) {
    return [a.slice(0, position), b, a.slice(position)].join('');
  }

  function addSlash(value) {
    const cleaned = value.replace(/\//g, '');

    if (cleaned.length < 2) {
      return cleaned;
    } else if (cleaned.length >= 2) {
      const slashAdded = addToPosition(cleaned, '/', 2);
      return slashAdded;
    }
  }

  function formatExpDate(value) {
    const formattedDate =
      expiryDate.length > value.length ? value : addSlash(value);
    setExpiryDate(formattedDate);
  }

  function formatCSV(value) {
    const formattedDate = value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
    setCvc(formattedDate);
  }

  function payNow() {
    const [expMonth, expYear] = expiryDate.split('/');
    const cardDetailsToEncrypt = {
      cvc: cvc,
      cardNumber: cardNumber,
      expMonth: expMonth,
      expYear: expYear,
    };
    // cacheCardToCart({ cardholderName, ...cardDetailsToEncrypt });
    initiatePayment(cardDetailsToEncrypt);
  }

  const renderTestCard = () => {
    if (isProdEnv) {
      return null;
    }
    const useTestAuthCard = () => {
      setCardholderName('James Bond');
      setCardNumber('4000002760003184');
      setExpiryDate('02/22');
      setCvc('123');
    };
    const useTestCard = () => {
      setCardholderName('James Bond');
      setCardNumber('4242424242424242');
      setExpiryDate('02/22');
      setCvc('123');
    };

    return (
      <>
        <ClickableText onPress={useTestAuthCard}>
          Use Auth Test Card
        </ClickableText>
        <ClickableText onPress={useTestCard}>Use Test Card</ClickableText>
      </>
    );
  };

  // TODO: determine card type from number
  return (
    <ScreenContainer
      back
      header={<HeaderIconSpacer iconHeight={cardHeight / 2} />}>
      <HeaderIconContainer iconHeight={cardHeight}>
        <CardIcon height={cardHeight} />
      </HeaderIconContainer>
      <HeaderIconSpacer iconHeight={cardHeight / 2} />
      <FormWrapper offSet={20}>
        <Input
          //   label="CARDHOLDER NAME"
          placeholder="Name on card"
          value={cardholderName}
          onChangeText={setCardholderName}
          maxLength={26} //ISO IEC 7813 the cardholder name length limit
          //   editable={false}
          // errorStyle={{ color: 'red' }}
          errorMessage={nameError}
        />
        <Input
          //   label="CARD NUMBER"
          placeholder="Card number"
          value={cardNumber}
          onChangeText={handleCardNumber}
          //   editable={false}
          maxLength={19} // This includes spaces (16 + 3 spaces)
          returnKeyType={'done'}
          autoCapitalize="none"
          autoComplete="cc-number" //Android
          keyboardType="number-pad"
          textContentType="creditCardNumber" //iOS
          errorMessage={cardError}
        />
        <Row>
          <ExpiryWrapper>
            <Input
              //   label="EXPIRY DATE"
              placeholder="Expiry (MM/YY)"
              value={expiryDate}
              onChangeText={formatExpDate}
              //   editable={false}
              maxLength={5}
              returnKeyType={'done'}
              autoCapitalize="none"
              autoComplete="cc-exp" //Android
              keyboardType="number-pad"
              errorMessage={expiryError}
            />
          </ExpiryWrapper>
          <CvcWrapper>
            <Input
              //   label="CVV"
              placeholder="CVV"
              value={cvc}
              onChangeText={formatCSV}
              //   editable={false}
              maxLength={4}
              returnKeyType={'done'}
              autoCapitalize="none"
              autoComplete="cc-csc" //Android
              keyboardType="number-pad"
              errorMessage={cvvError}
            />
          </CvcWrapper>
        </Row>
        {renderTestCard()}
      </FormWrapper>
      <InfoBox />
      <FooterContainer>
        <PayButton
          isLoading={loading}
          showLoadingAnimation={false}
          isDisabled={!canGoNext || disabled}
          onPressHandler={payNow}>
          {'Pay Now'}
        </PayButton>
        <CancelButton onPress={goTo.autoOffset}>{'Cancel'}</CancelButton>
      </FooterContainer>
    </ScreenContainer>
  );
}
const propTypes = {};
const defaultProps = {
  initiatePayment: () => {},
};
CardDetailsScreen.defaultProps = defaultProps;
CardDetailsScreen.propTypes = propTypes;
export default CardDetailsScreen;
