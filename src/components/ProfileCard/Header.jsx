import React from 'react';
import { CircularProgress } from '@material-ui/core'
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Skeleton } from '@material-ui/lab';
import profileImage from '../../images/avatar.png';

const useStyles = makeStyles({
  root: {
    marginLeft: '4px',
    position: 'relative',
  },
  bottom: {
    color: '#E6E8EB',
  },
  top: {
    color: '#F43168',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLineCap: 'round',
  }
});

function Header (props) {
  const styles = useStyles();
  const condition = (classes1, classes2) => props.toggleTheme ? classes1 : classes2;

  return (
    <div className=''>
      <div className={`d-flex ${!props.loading ? condition('custom-border-bottom-light', 'custom-border-bottom-dark') : ''} custom-padding-x custom-padding-y`}>
        <div className=''>
          {!props.loading && <img alt='user-profile' className={`profile-avatar ${condition('shadow-light', 'shadow-dark')}`} src={profileImage} />}
          {props.loading &&
            <Skeleton
              animation='wave'
              variant='circle'
              height={50}
              width={50}
            />}
        </div>
        <div className='d-flex flex-column'>
          <div className='user-info-container'>
            {!props.loading && <p id={'player-name'} className={`${condition('text-black-100', 'text-white')} fs-1`} style={{ margin: '0' }}>{props.data.PlayerName}</p>}
            {!props.loading && <p id={'player-location'} className={`${condition('text-black-70', 'text-grey-100')} fs-4`} style={{ margin: '0' }} >{props.data.HomeCourse}, UK</p>}
            {props.loading &&
            <Skeleton
              width={150}
              height={15}
              animation='wave'
            />}
            {props.loading &&
            <Skeleton
              width={150}
              height={15}
              animation='wave'
            />}
          </div>
          {!props.loading && <div className='d-flex user-info-container'>
            <div className={`d-flex ${condition('custom-border-right-light', 'custom-border-right-dark')} pr-3`}>
              <div className='d-flex flex-column'>
                <p  className={`${condition('text-black-70', 'text-grey-100')} m-0 fs-4`}>Quality</p>
                <p id='quality' className={`text-left ${condition('text-black-100', 'text-white')} m-0 fs-2 d-inline-flex`}>
                  {props.data.Quality}
                  <ArrowDropUp size={16} />
                </p>
              </div>
              <div className={styles.root}>
                <CircularProgress
                  size={28}
                  variant='determinate'
                  value={100}
                  thickness={3}
                  className={styles.bottom}
                  {...props}
                />
                <CircularProgress
                  disableShrink
                  size={28}
                  variant='static'
                  value={props.data.Quality}
                  thickness={3}
                  className={styles.top}
                  classes={{
                    circle: styles.circle
                  }}
                  {...props}
                />
              </div>
            </div>
            <div className={`d-flex ${condition('custom-border-right-light', 'custom-border-right-dark')} px-3`}>
              <div className='d-flex flex-column'>
                <p className={`${condition('text-black-70', 'text-grey-100')} m-0 fs-4`}>Handicap</p>
                <p id='handicap' className={`${condition('text-black-100', 'text-white')} m-0 text-left fs-4`}>{props.data.Handicap}</p>
              </div>
            </div>
            <div className='d-flex px-3'>
              <div className='d-flex flex-column'>
                <p className={`${condition('text-black-70', 'text-grey-100')} m-0 fs-4`}>SG Total</p>
                <p id='sg-total' className={`${condition('text-black-100', 'text-white')} m-0 text-left fs-2 d-inline-flex`}>{props.data.SGTotal} <ArrowDropDown size={16} color={condition('#000', '#FFF')} /></p>
              </div>
            </div>
          </div>}
          {props.loading &&
            <div className='d-flex user-info-container-loader'>
              <Skeleton
                  animation='wave'
                  width={50}
                  height={15}
                />
            </div>}
        </div>
      </div>  
    </div>
  );
}

export default Header;