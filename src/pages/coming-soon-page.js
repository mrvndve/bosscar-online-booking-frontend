const ComingSoonPage = () => (
  <div className='coming-soon-background'>
    <div className='row g-4'>
      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6'>
        <div 
          style={{
            minHeight: '100vh',
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/coming-soon.jpg)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover'
          }}
        />
      </div>

      <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6'>
        <div align='center' style={{ padding: '300px 20px 300px 20px' }}>
          <span style={{ fontSize: 50, color: 'white' }}>
            <strong>
              Coming Soon
            </strong>
          </span>

          <br/>

          <span style={{ fontSize: 25, color: 'white' }}>
            Website coming soon. Please check back to know more and contact us.
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default ComingSoonPage;