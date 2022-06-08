import { BroadcastTypeCodes, BroadcastTypeCodesValue } from 'models/Broadcasts';

import CreditsWelcome from '../Casts/CreditsWelcome';
import InsuranceOffsetNode from '../Casts/InsuranceOffsetNode';

const chooseBroadcastNode = (typeCode: BroadcastTypeCodesValue) => {
  if (typeCode === BroadcastTypeCodes.CREDIT) {
    return CreditsWelcome;
  }
  if (typeCode === BroadcastTypeCodes.INSURANCE) {
    return InsuranceOffsetNode;
  }
  return null;
};

export default chooseBroadcastNode;
