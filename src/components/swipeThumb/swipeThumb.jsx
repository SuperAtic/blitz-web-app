import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// Constants
const COLORS = {
  darkModeText: "#ffffff",
  lightModeText: "#000000",
  primary: "#007AFF",
};

const DEFAULT_ANIMATION_DURATION = 400;
const RESET_AFTER_SUCCESS_DEFAULT_DELAY = 1000;
const SHOULD_ANIMATE_VIEW_ON_SUCCESS = true;
const SWIPE_SUCCESS_THRESHOLD = 70;

// Animations
const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;

const fadeOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
  `;

// Styled components
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid;
  transition: width 0.2s ease, background-color 0.2s ease,
    border-color 0.2s ease;
`;

const Title = styled.span`
  position: absolute;
  align-self: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  white-space: nowrap;
  transition: opacity 0.2s ease, transform 0.2s ease;
`;

const ThumbContainer = styled.div`
  position: absolute;
  border-radius: 50px;
  border-width: 3px;
  border-style: solid;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.4s ease, background-color 0.2s ease,
    border-color 0.2s ease;
  cursor: grab;
  user-select: none;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`;

const ThumbIcon = styled.div`
  border-radius: 50px;
  border-width: 2px;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: -3px 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: ${(props) => (props.show ? fadeIn : fadeOut)} 0.2s ease forwards;
`;

// Loading spinner component
const LoadingSpinner = ({ size = "small", color = COLORS.lightModeText }) => {
  const spinnerSize = size === "small" ? 20 : 30;

  return (
    <div
      style={{
        width: spinnerSize,
        height: spinnerSize,
        border: `3px solid ${color}`,
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: `${keyframes`
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        `} 1s linear infinite`,
      }}
    />
  );
};

// SwipeThumb component
const SwipeThumb = memo(
  ({
    disabled = false,
    disableResetOnTap = false,
    enableReverseSwipe = false,
    forceReset,
    layoutWidth = 0,
    onSwipeFail,
    onSwipeStart,
    onSwipeSuccess,
    railStyles = {},
    resetAfterSuccessAnimDelay,
    resetAfterSuccessAnimDuration = 200,
    screenReaderEnabled = false,
    shouldResetAfterSuccess = true,
    swipeSuccessThreshold,
    thumbIconComponent: ThumbIconComponent,
    thumbIconHeight = 55,
    thumbIconStyles = {},
    thumbIconWidth,
    title = "Swipe to submit",
    animateViewOnSuccess,
    handleSwipeProgress,
    theme,
  }) => {
    const backgroundColor = theme ? COLORS.darkModeText : COLORS.lightModeText;
    const backgroundOffset = theme ? COLORS.lightModeText : COLORS.darkModeText;
    const paddingAndMarginsOffset = 3 + 2 * 2; // borderWidth + 2 * margin
    const defaultContainerWidth = thumbIconHeight;
    const maxWidth = layoutWidth - paddingAndMarginsOffset;
    const isRTL = false; // Assuming LTR for web
    const animatedWidth = useRef(defaultContainerWidth);
    const [defaultWidth, setDefaultWidth] = useState(defaultContainerWidth);
    const [shouldDisableTouch, disableTouch] = useState(false);
    const thumbRef = useRef(null);
    const startX = useRef(0);
    const currentX = useRef(0);

    const reset = () => {
      disableTouch(false);
      setDefaultWidth(defaultContainerWidth);
      handleSwipeProgress && handleSwipeProgress(0);
    };

    const invokeOnSwipeSuccess = () => {
      disableTouch(disableResetOnTap);
      animateViewOnSuccess();
      onSwipeSuccess && onSwipeSuccess();
    };

    const finishRemainingSwipe = () => {
      setDefaultWidth(maxWidth);
      handleSwipeProgress && handleSwipeProgress(1);
      invokeOnSwipeSuccess();

      const resetDelay =
        DEFAULT_ANIMATION_DURATION +
        (resetAfterSuccessAnimDelay !== undefined
          ? resetAfterSuccessAnimDelay
          : RESET_AFTER_SUCCESS_DEFAULT_DELAY);

      setTimeout(() => {
        shouldResetAfterSuccess && reset();
      }, resetDelay);
    };

    const onSwipeNotMetSuccessThreshold = () => {
      setDefaultWidth(defaultContainerWidth);
      onSwipeFail && onSwipeFail();
      handleSwipeProgress && handleSwipeProgress(0);
    };

    const onSwipeMetSuccessThreshold = (newWidth) => {
      if (newWidth !== maxWidth) {
        finishRemainingSwipe();
        return;
      }
      invokeOnSwipeSuccess();
      reset();
    };

    const handleTouchStart = (e) => {
      console.log(e, disabled);
      if (disabled) return;
      startX.current = e.touches ? e.touches[0].clientX : e.clientX;
      currentX.current = startX.current;
      onSwipeStart && onSwipeStart();
      document.addEventListener("mousemove", handleTouchMove);
      document.addEventListener("mouseup", handleTouchEnd);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    };

    const handleTouchMove = (e) => {
      if (disabled) return;
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const reverseMultiplier = enableReverseSwipe ? -1 : 1;
      const rtlMultiplier = isRTL ? -1 : 1;
      const dx = clientX - startX.current;
      const newWidth =
        defaultContainerWidth + rtlMultiplier * reverseMultiplier * dx;

      if (newWidth < defaultContainerWidth) {
        reset();
      } else if (newWidth > maxWidth) {
        setDefaultWidth(maxWidth);
        handleSwipeProgress && handleSwipeProgress(1);
      } else {
        animatedWidth.current = newWidth;
        setDefaultWidth(newWidth);
        const progress =
          (newWidth - defaultContainerWidth) /
          (maxWidth - defaultContainerWidth);
        handleSwipeProgress && handleSwipeProgress(progress);
      }
      currentX.current = clientX;
    };

    const handleTouchEnd = () => {
      if (disabled) return;
      const reverseMultiplier = enableReverseSwipe ? -1 : 1;
      const rtlMultiplier = isRTL ? -1 : 1;
      const dx = currentX.current - startX.current;
      const newWidth =
        defaultContainerWidth + rtlMultiplier * reverseMultiplier * dx;
      const successThresholdWidth = maxWidth * (swipeSuccessThreshold / 100);

      newWidth < successThresholdWidth
        ? onSwipeNotMetSuccessThreshold()
        : onSwipeMetSuccessThreshold(newWidth);

      console.log(newWidth);

      document.removeEventListener("mousemove", handleTouchMove);
      document.removeEventListener("mouseup", handleTouchEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    useEffect(() => {
      if (forceReset) {
        forceReset(reset);
      }
    }, [forceReset]);

    const renderThumbIcon = () => {
      const iconWidth = thumbIconWidth || thumbIconHeight;
      const dynamicStyles = {
        height: thumbIconHeight,
        width: iconWidth,
        backgroundColor: theme ? backgroundColor : COLORS.darkModeText,
        borderColor: theme ? backgroundColor : COLORS.darkModeText,
        ...thumbIconStyles,
      };

      return (
        <ThumbIcon style={dynamicStyles}>
          {/* {ThumbIconComponent && <ThumbIconComponent />} */}
        </ThumbIcon>
      );
    };

    const panStyle = {
      backgroundColor: theme ? backgroundColor : COLORS.darkModeText,
      borderColor: theme ? backgroundColor : COLORS.darkModeText,
      width: defaultWidth,
      height: thumbIconHeight,
      ...(enableReverseSwipe ? { right: 0 } : { left: 0 }),
      ...railStyles,
    };

    if (screenReaderEnabled) {
      return (
        <button
          aria-label={`${title}. ${
            disabled ? "Disabled" : "Double-tap to activate"
          }`}
          disabled={disabled}
          onClick={onSwipeSuccess}
          style={{
            ...panStyle,
            width: defaultContainerWidth,
            position: "absolute",
            border: "none",
            outline: "none",
            cursor: "pointer",
            padding: 0,
            background: "transparent",
          }}
        >
          {renderThumbIcon()}
        </button>
      );
    }

    return (
      <ThumbContainer
        ref={thumbRef}
        onMouseDown={handleTouchStart}
        onTouchStart={handleTouchStart}
        style={{
          ...panStyle,
          pointerEvents: shouldDisableTouch ? "none" : "auto",
        }}
      >
        {renderThumbIcon()}
      </ThumbContainer>
    );
  }
);

// Main SwipeButton Component
const SwipeButton = function SwipeButton({
  containerStyles: customContainerStyles = {},
  disabled = false,
  disableResetOnTap = false,
  enableReverseSwipe = false,
  forceReset,
  height = 55,
  onSwipeFail,
  onSwipeStart,
  onSwipeSuccess,
  railStyles = {},
  resetAfterSuccessAnimDelay,
  resetAfterSuccessAnimDuration,
  shouldResetAfterSuccess,
  swipeSuccessThreshold = SWIPE_SUCCESS_THRESHOLD,
  thumbIconComponent,
  thumbIconStyles = {},
  thumbIconWidth,
  title = "Slide to confirm",
  shouldAnimateViewOnSuccess = SHOULD_ANIMATE_VIEW_ON_SUCCESS,
  width = 0.95,
  maxWidth = 375,
  shouldDisplaySuccessState = false,
  theme = false, // Default to light theme
}) {
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const layoutWidth =
    windowWidth * width > maxWidth ? maxWidth : windowWidth * width;
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const [isUnmounting, setIsUnmounting] = useState(false);
  const [containerWidth, setContainerWidth] = useState(layoutWidth);
  const [textOpacity, setTextOpacity] = useState(1);
  const [textTranslateX, setTextTranslateX] = useState(0);
  const [loadingOpacity, setLoadingOpacity] = useState(0);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
  const prevPoint = useRef(0);

  const handleSwipeProgress = (progress) => {
    const jumpDistance = Math.abs(prevPoint.current - progress);
    prevPoint.current = progress;
    const duration = jumpDistance > 0.1 ? 200 : 0;

    // Animate text opacity
    setTextOpacity(1 - progress);

    // Animate text position
    setTextTranslateX(progress * 100);
  };

  const reset = () => {
    setShowLoadingIcon(false);
    setContainerWidth(layoutWidth);
    setLoadingOpacity(0);
  };

  const animateViewOnSuccess = () => {
    if (!shouldAnimateViewOnSuccess) return;
    const thumbSize = height + 3 + 2;
    setShowLoadingIcon(true);
    setContainerWidth(thumbSize);
    setLoadingOpacity(1);

    if (!shouldDisplaySuccessState && shouldResetAfterSuccess) {
      const resetDelay =
        DEFAULT_ANIMATION_DURATION +
        (resetAfterSuccessAnimDelay !== undefined
          ? resetAfterSuccessAnimDelay
          : RESET_AFTER_SUCCESS_DEFAULT_DELAY);

      setTimeout(() => {
        reset();
      }, resetDelay);
    }
  };

  useEffect(() => {
    if (shouldDisplaySuccessState) {
      animateViewOnSuccess();
    }
  }, [shouldDisplaySuccessState]);

  useEffect(() => {
    // Check for screen reader (simplified for web)
    const checkScreenReader = () => {
      // This is a simplified check - actual screen reader detection on web is more complex
      const isScreenReaderEnabled = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      setScreenReaderEnabled(isScreenReaderEnabled);
    };

    checkScreenReader();
    const motionMediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    motionMediaQuery.addEventListener("change", checkScreenReader);

    return () => {
      motionMediaQuery.removeEventListener("change", checkScreenReader);
      setIsUnmounting(true);
    };
  }, []);

  const railDynamicStyles = useMemo(() => {
    return {
      backgroundColor: showLoadingIcon
        ? COLORS.darkModeText
        : theme
        ? COLORS.darkModeText
        : COLORS.primary,
      borderColor: showLoadingIcon
        ? COLORS.darkModeText
        : theme
        ? COLORS.lightModeText
        : COLORS.darkModeText,
    };
  }, [theme, showLoadingIcon]);

  const titleDynamicStyles = useMemo(() => {
    return {
      color: theme ? COLORS.lightModeText : COLORS.darkModeText,
    };
  }, [theme]);

  return (
    <Container
      style={{
        width: containerWidth,
        height: height + 3 + 2,
        borderRadius: (height + 3 + 2) / 2,
        ...railDynamicStyles,
        ...customContainerStyles,
      }}
    >
      {showLoadingIcon ? (
        <LoadingContainer show={showLoadingIcon}>
          <LoadingSpinner loadingColor={COLORS.lightModeText} size="small" />
        </LoadingContainer>
      ) : (
        <>
          <Title
            style={{
              opacity: textOpacity,
              transform: `translateX(${textTranslateX}px)`,
              ...titleDynamicStyles,
            }}
          >
            {title}
          </Title>

          {layoutWidth > 0 && (
            <SwipeThumb
              disabled={disabled}
              disableResetOnTap={disableResetOnTap}
              enableReverseSwipe={enableReverseSwipe}
              forceReset={forceReset}
              layoutWidth={layoutWidth}
              onSwipeFail={onSwipeFail}
              onSwipeStart={onSwipeStart}
              onSwipeSuccess={onSwipeSuccess}
              railStyles={railStyles}
              resetAfterSuccessAnimDelay={resetAfterSuccessAnimDelay}
              resetAfterSuccessAnimDuration={resetAfterSuccessAnimDuration}
              screenReaderEnabled={screenReaderEnabled}
              shouldResetAfterSuccess={shouldResetAfterSuccess}
              swipeSuccessThreshold={swipeSuccessThreshold}
              thumbIconComponent={thumbIconComponent}
              thumbIconHeight={height}
              thumbIconStyles={thumbIconStyles}
              thumbIconWidth={thumbIconWidth}
              title={title}
              animateViewOnSuccess={animateViewOnSuccess}
              handleSwipeProgress={handleSwipeProgress}
              theme={theme}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default SwipeButton;
