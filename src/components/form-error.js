import { isEmpty } from "lodash";

const FormError = ({ error }) => (
  <div>
    {!isEmpty(error) && (
      <div
        className='mb-4'
        style={{ 
          backgroundColor: '#e74c3c', 
          color: 'white', 
          padding: '10px 25px 10px 25px', 
          fontSize: 14, 
        }}
        align='left'
      >
        <div>
          {`* ${error}`}
        </div>
      </div>
    )}
  </div>
);

export default FormError;