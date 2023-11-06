function CommunityHeader(){
    return(
        <div className='bgDarkGray d-flex align-items-center p-3 mt-5 mb-3 rounded-0 border border-danger border-end-0 border-start-0'>
          <img src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficon-library.com%2Fimages%2Fgrand-theft-auto-5-icon%2Fgrand-theft-auto-5-icon-17.jpg&f=1&nofb=1&ipt=1dfde564652503c35d761316fa63f3d359033658b8428153ec3fa94737d6903f&ipo=images'
            className='rounded logoSize bg-light'
          />
          <div className='px-5'>
            <h1 className='text-light my-0'>Grand Theft Auto V</h1>
            <h5 className='lightGray'>community/gtav</h5>
          </div>
        </div>
    )
}

export default CommunityHeader;