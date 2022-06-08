import Detailed from './Quote.Detailed';
import Simple from './Quote.Simple';

Detailed.Simple = Simple;

export { Simple as SimpleQuote, Detailed as DetailedQuote };

export default Detailed;
