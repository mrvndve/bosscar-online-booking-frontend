import React from 'react';

import { 
  Paper,
} from '@mui/material';

const Card = ({
  className = '',
  style = {},
  padding = 30,
  elevation = 1,
  square = true,
  children,
  onClick,
  ...rest
}) => {
  return <>
    <Paper
      className={className}
      style={{...{
        padding: padding,
      }, ...style}}
      square={square}
      elevation={elevation}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Paper>
  </>
};

export {
  Card,
};