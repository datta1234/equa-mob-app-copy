import React from 'react';

import { isEmpty } from 'lodash';

import {
  CertificationsContainer,
  Title,
  HorizontalScroll,
  CertificationContainer,
  CertificationImage,
} from './certificationStandards.styles';

const CertificationStandards = ({ certificationStandards }) => {
  if (isEmpty(certificationStandards)) {
    return null;
  }
  return (
    <CertificationsContainer>
      <Title>{'Verified by'}</Title>
      <HorizontalScroll>
        {certificationStandards?.map((standard, idx) => (
          <CertificationContainer key={standard.id}>
            <CertificationImage
              uri={standard.imageUrl}
              isLast={(idx + 1) % 2 === 0}
            />
          </CertificationContainer>
        ))}
      </HorizontalScroll>
    </CertificationsContainer>
  );
};

export default CertificationStandards;
