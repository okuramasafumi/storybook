import React, { FunctionComponent, SyntheticEvent } from 'react';
import { State } from '@storybook/api';
import { Link } from '@storybook/router';
import { styled } from '@storybook/theming';
import { Icons, IconButton } from '@storybook/components';

const DEFAULT_ICON_COLOUR = '#66BF3C' as const;

const Notification = styled.div(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  padding: '13px 15px',
  width: '280px',
  borderRadius: 4,
  fontSize: theme.typography.size.s1,
  fontWeight: theme.typography.weight.bold,
  background:
    theme.base === 'light'
      ? 'rgba(50,53,71,0.97)'
      : 'linear-gradient(0deg, rgba(248,248,248,0.97) 0%, rgba(247,252,255,0.97) 100%)',
  boxShadow: `0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)`,
  color: theme.color.inverseText,
  textDecoration: 'none',
  '&:hover': {
    boxShadow:
      '0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)',
  },
  '&:active': {
    boxShadow:
      '0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)',
  },
  '&:focus': {
    boxShadow:
      '0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)',
  },
}));

const NotificationLink = Notification.withComponent(Link);

const NotificationIconWrapper = styled.div(() => ({
  display: 'flex',
  marginRight: 10,
  alignItems: 'center',
}));

const NotificationTextWrapper = styled.div(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const Headline = styled.div(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  color: theme.base === 'light' ? '#fff' : '#333333',
  fontSize: 12,
  lineHeight: '14px',
  fontWeight: 'bold',
}));

const SubHeadline = styled.div(({ theme }) => ({
  color: theme.base === 'light' ? 'rgba(255,255,255,0.7)' : ' #999999',
  fontSize: 11,
  fontWeight: 'normal',
  marginTop: 3,
  marginRight: 5,
  lineHeight: 1,
}));

const truncateLongHeadlines = (headline: string, length = 30) =>
  headline.length > length ? `${headline.substr(0, length - 1)}…` : headline;

const ItemContent: FunctionComponent<Pick<State['notifications'][0], 'icon' | 'content'>> = ({
  icon,
  content: { headline, subHeadline },
}) => (
  <>
    {!icon || (
      <NotificationIconWrapper>
        <Icons icon={icon.name} width={14} color={icon.color || DEFAULT_ICON_COLOUR} />
      </NotificationIconWrapper>
    )}
    <NotificationTextWrapper>
      <Headline title={headline}>{truncateLongHeadlines(headline)}</Headline>
      {subHeadline && <SubHeadline>{subHeadline}</SubHeadline>}
    </NotificationTextWrapper>
  </>
);

const DismissButtonWrapper = styled(IconButton)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  color: theme.base === 'light' ? 'rgba(255,255,255,0.7)' : ' #999999',
}));

const DismissNotificationItem: FunctionComponent<{
  onClick: () => void;
}> = ({ onClick }) => (
  <div>
    <DismissButtonWrapper
      title="Dismiss notification"
      onClick={(e: SyntheticEvent) => {
        e.preventDefault();
        onClick();
      }}
    >
      <Icons icon="closeAlt" height={12} width={12} />
    </DismissButtonWrapper>
  </div>
);

export const NotificationItemSpacer = styled.div({
  height: 48,
});

const NotificationItem: FunctionComponent<{
  notification: State['notifications'][0];
  setDismissedNotification: (id: string) => void;
}> = ({ notification: { content, link, onClear, id, icon }, setDismissedNotification }) => {
  const dismissNotificationItem = () => {
    setDismissedNotification(id);
    onClear();
  };
  return link ? (
    <NotificationLink to={link}>
      <ItemContent icon={icon} content={content} />
      <DismissNotificationItem onClick={dismissNotificationItem} />
    </NotificationLink>
  ) : (
    <Notification>
      <ItemContent icon={icon} content={content} />
      <DismissNotificationItem onClick={dismissNotificationItem} />
    </Notification>
  );
};

export default NotificationItem;
