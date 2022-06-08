import { gql } from '@apollo/client';

export const PORTFOLIOS_MEDIA_FRAGMENT = gql`
  fragment media on PortfolioMediaDTO {
    id
    format
    mediaId
    portfolioId
    typeCode
    url
  }
`;

export const PORTFOLIOS_QUOTE_FRAGMENT = gql`
  fragment quote on PortfolioQuoteDTO {
    totalAmount
    totalKgCo2e {
      value
      valueRounded
    }
    totalHabitAmount
    totalHabitKgCo2e {
      value
      valueRounded
    }
    currency {
      id
      code
      symbol
    }
  }
`;

export const PORTFOLIOS_SUB_QUOTE_FRAGMENT = gql`
  fragment subQuote on PortfolioQuoteDTO {
    name
    totalOnceOffAmount
    totalOnceOffKgCo2e {
      value
      valueRounded
    }
    ...quote
  }
  ${PORTFOLIOS_QUOTE_FRAGMENT}
`;

export const PORTFOLIOS_PROJECTS_FRAGMENT = gql`
  fragment projects on PortfolioProjectDTO {
    allocationPercentage
    categoryName
    media {
      id
      format
      mediaId
      projectId
      typeCode
      url
    }
    name
    portfolioId
    projectId
    shortDescription
  }
`;
export const PORTFOLIOS_PRICES_FRAGMENT = gql`
  fragment prices on PortfolioPriceDTO {
    currencyCode
    currencyId
    currencySymbol
    id
    portfolioId
    priceId
    purchasePricePerKgCo2eInCents
    sellingPricePerKgCo2eInCents
  }
`;
export const SUSTAINABLE_GOALS_FRAGMENT = gql`
  fragment sustainableGoals on SustainableGoalDTO {
    id
    code
    imageUrl
    order
  }
`;
export const CERTIFICATION_STANDARDS_FRAGMENT = gql`
  fragment certificationStandards on CertificationStandardDTO {
    code
    id
    imageUrl
  }
`;

export const PROJECT_FRAGMENT = gql`
  fragment project on ProjectDTO {
    id
    name
    shortDescription
    description
    address
    categoryId
    categoryName
    developerId
    media {
      id
      format
      mediaId
      projectId
      typeCode
      url
      referenceUrl
    }
    sustainableGoals {
      id
      code
      imageUrl
      order
      projectId
      sustainableGoalId
    }
    certificationStandards {
      certificationStandardId
      code
      id
      imageUrl
      projectId
    }
  }
`;
export const PORTFOLIOS_FRAGMENT = gql`
  fragment portfolios on PortfolioDTO {
    id
    name
    shortDescription
    description
    media {
      ...media
    }
    quote {
      ...quote
    }
  }
  ${PORTFOLIOS_MEDIA_FRAGMENT}
  ${PORTFOLIOS_QUOTE_FRAGMENT}
`;
export const PORTFOLIO_FRAGMENT = gql`
  fragment portfolio on PortfolioDTO {
    id
    name
    shortDescription
    description

    sustainableGoals {
      ...sustainableGoals
    }
    certificationStandards {
      ...certificationStandards
    }
    projects {
      ...projects
    }
    prices {
      ...prices
    }
    media {
      ...media
    }
    quote {
      ...quote
    }
  }
  ${PORTFOLIOS_MEDIA_FRAGMENT}
  ${PORTFOLIOS_QUOTE_FRAGMENT}
  ${PORTFOLIOS_PROJECTS_FRAGMENT}
  ${PORTFOLIOS_PRICES_FRAGMENT}
  ${SUSTAINABLE_GOALS_FRAGMENT}
  ${CERTIFICATION_STANDARDS_FRAGMENT}
`;
export const PORTFOLIO_SUB_FRAGMENT = gql`
  fragment portfolio on PortfolioDTO {
    id
    name
    shortDescription
    media {
      ...media
    }
    quote {
      ...subQuote
    }
  }
  ${PORTFOLIOS_MEDIA_FRAGMENT}
  ${PORTFOLIOS_SUB_QUOTE_FRAGMENT}
`;

export const SUBSCRIPTION_FRAGMENT = gql`
  fragment subscription on SubscriptionDTO {
    id
    billingDate
    portfolio {
      ...portfolio
    }
  }
  ${PORTFOLIO_SUB_FRAGMENT}
`;

export const ACTIVITY_LOG_FRAGMENT = gql`
  fragment activityLogFragment on UserEmissionDTO {
    id
    activityTypeCode
    activityTypeInputCode
    activityTypeInputTitle
    activityTypeTitle
    createdDateTime
    frequencyTypeCode
    frequencyTypeTitle
    input
    inputTypeCode
    inputTypeTitle
    output
    outputTypeCode
    outputTypeTitle
    typeCode
    typeTitle
  }
`;

export const EMISSION_TEMPLATE_FRAGMENT = gql`
  fragment EmissionsTemplateFragment on EmissionFormTemplateDTO {
    type
    code
    nextCode
    title
    subTitle
    placeholder
    factor
    quantity
    unitType
    toolTip {
      title
      trigger {
        code
        defaultValue
        displayMessage
      }
    }
    data {
      type
      code
      nextCode
      title
      order
      selected
      active
      toolTip {
        title
        trigger {
          code
          defaultValue
          displayMessage
        }
      }
    }
  }
`;

// JR OLD ********************
export const PARTNER_FRAGMENT = gql`
  fragment partnerFragment on Partner {
    id
    businessCategory
    businessName
    thumbnailLogo(revision: "x150")
  }
`;

export const PROJECT_MINIATURE = gql`
  fragment projectMiniatureFragment on Project {
    id
    # thumbnailBackground(revision: "x350x480")
    location
    name
    status
    projectType
  }
`;

export const MY_PROJECT_MINIATURE = gql`
  fragment myProjectMiniatureFragment on MyProject {
    id
    # thumbnailBackground(revision: "x350x480")
    location
    name
    status
    projectType
    interest
  }
`;

export const PROJECT = gql`
  fragment projectFragment on Project {
    category
    description
    developer
    # isVeraVerification
    verification
    emissionReduction
    id
    latitude
    location
    longitude
    name
    price
    projectType
    registrationDate
    status
    thumbnailBackground(revision: "x950x700")
    thumbnailLogo(revision: "x150")
    usersCount
    webcamLink
    websiteLink
    usersCount

    members(count: 4) {
      id
      thumbnailAvatar(revision: "x140")
    }

    developmentGoals {
      id
      name
      thumbnailLogo(revision: "x150")
    }

    standards {
      id
      name
      # thumbnailLogo(revision: "x150")
      thumbnailLogo(revision: "x165x40")
    }
  }
`;

export const OFFER_FRAGMENT = gql`
  fragment offerFragment on Offer {
    id
    description
    name
    tempCode
    partner {
      ...partnerFragment
    }
  }
  ${PARTNER_FRAGMENT}
`;

// export const ACTIVITY_LOG_FRAGMENT = gql`
//   fragment activityLogFragment on ActivityLog {
//     activityType
//     category
//     id
//     measurement
//     objectId
//     title
//     value
//   }
// `;

export const USER_FRAGMENT = gql`
  fragment userFragment on User {
    id
    carbonCreditCode
    email
    firstName
    lastName
    mobileNumber
    # location
    # carbonDioxideVolumeSum
    carbonOffset
    # thumbnailAvatar(revision: "x120")
    offer {
      ...offerFragment
    }
  }
  ${OFFER_FRAGMENT}
`;

export const EMISSION_TYPE = gql`
  fragment emissionTypeFragment on EmissionType {
    label
    value
  }
`;

export const EMISSION = gql`
  fragment emissionFragment on Emission {
    label
    measuring
    unit
    value
  }
`;

export const ACTIVITY = gql`
  fragment activityFragment on Activity {
    emissionTypes {
      options {
        ...emissionTypeFragment
      }
      title
    }
    # emissions(emissionTypeId: ID!) {
    #   options {
    #     ...emissionFragment
    #   }
    #   title
    # }
    id
    thumbnailLogo(revision: "x150")
    title
  }

  ${EMISSION}
  ${EMISSION_TYPE}
`;

export const FOOTPRINT_ACTIVITY = gql`
  fragment footprintActivityFragment on FootprintActivity {
    carbonDioxideVolume
    emission {
      ...emissionFragment
    }
    emissionType {
      ...emissionTypeFragment
    }
    # activity {
    #   ...activityFragment
    # }
    id
    label
    value
  }

  ${EMISSION}
  ${EMISSION_TYPE}
`;

// export const USER_FOOTPRINT_FRAGMENT = gql`
//   fragment userFootprint on UserFootprintDTO {
//     totalEmissions
//     totalOffsets
//     totalFootprint
//     totalActivityEmissions
//     totalHabitEmissions
//   }
// `;
