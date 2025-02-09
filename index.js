import {BottomSheetBackdrop, BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import React, {createRef, PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import Hcaptcha from './Hcaptcha';
import PropTypes from 'prop-types';

class ConfirmHcaptcha extends PureComponent {
  constructor(props) {
    super(props);

    this.ref = createRef();
  }

  show = () => {
    if (this.ref?.current) {
      this.ref.current.present();
    }
  };

  hide = (source) => {
    const { onMessage } = this.props;

    this.ref.current.close();

    if (source) { // if source === undefined => called by the user
      onMessage({ nativeEvent: { data: 'cancel' } });
    }
  };

  renderBackdrop = (props) => {
    if (this.props.hasBackdrop) {
      return (
          <BottomSheetBackdrop
              {...props}
              animatedIndex={{value: 1}}
          />
      );
    }

    return null;
  };

  render() {
    let {
      size,
      siteKey,
      baseUrl,
      languageCode,
      orientation,
      onMessage,
      showLoading,
      closableLoading,
      backgroundColor,
      loadingIndicatorColor,
      theme,
      rqdata,
      sentry,
      jsSrc,
      endpoint,
      reportapi,
      assethost,
      imghost,
      host,
      debug,
    } = this.props;

    return (
      <BottomSheetModal
          ref={this.ref}
          backdropComponent={renderBackdrop}
      >
        <BottomSheetView>
          <Hcaptcha
            url={baseUrl}
            size={size}
            siteKey={siteKey}
            onMessage={onMessage}
            languageCode={languageCode}
            showLoading={showLoading}
            closableLoading={closableLoading}
            loadingIndicatorColor={loadingIndicatorColor}
            backgroundColor={backgroundColor}
            theme={theme}
            rqdata={rqdata}
            sentry={sentry}
            jsSrc={jsSrc}
            endpoint={endpoint}
            reportapi={reportapi}
            assethost={assethost}
            imghost={imghost}
            host={host}
            orientation={orientation}
            debug={debug}
          />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  modal: { margin: 0, display: 'none' },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

ConfirmHcaptcha.propTypes = {
  size: PropTypes.string,
  siteKey: PropTypes.string.isRequired,
  passiveSiteKey: PropTypes.bool,
  baseUrl: PropTypes.string,
  onMessage: PropTypes.func,
  languageCode: PropTypes.string,
  orientation: PropTypes.string,
  backgroundColor: PropTypes.string,
  showLoading: PropTypes.bool,
  closableLoading: PropTypes.bool,
  loadingIndicatorColor: PropTypes.string,
  theme: PropTypes.string,
  rqdata: PropTypes.string,
  sentry: PropTypes.bool,
  jsSrc: PropTypes.string,
  endpoint: PropTypes.string,
  reportapi: PropTypes.string,
  assethost: PropTypes.string,
  imghost: PropTypes.string,
  host: PropTypes.string,
  hasBackdrop: PropTypes.bool,
  debug: PropTypes.object,
};

ConfirmHcaptcha.defaultProps = {
  size: 'invisible',
  passiveSiteKey: false,
  showLoading: false,
  closableLoading: false,
  orientation: 'portrait',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  loadingIndicatorColor: null,
  theme: 'light',
  rqdata: null,
  sentry: false,
  jsSrc: 'https://js.hcaptcha.com/1/api.js',
  endpoint: undefined,
  reportapi: undefined,
  assethost: undefined,
  imghost: undefined,
  host: undefined,
  hasBackdrop: true,
  debug: {},
};

export default ConfirmHcaptcha;
