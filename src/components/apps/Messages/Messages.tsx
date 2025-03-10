import { mdiCheckCircle, mdiDotsHorizontal, mdiSend, mdiVideo } from '@mdi/js';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'preact/hooks';
import { AppIcon } from '__/components/utils/AppIcon';
import { formatDistanceToNow, format, isToday, isYesterday, isSameDay } from 'date-fns';
import { JSX } from 'preact';
import {
  activeConversationIdAtom,
  conversationsAtom,
  selectedConversationAtom,
  newMessageInputAtom,
  Message,
} from '__/stores/messages.app.store';
import css from './Messages.module.scss';

const Messages = () => {
  const [conversations, setConversations] = useAtom(conversationsAtom);
  const [activeConversationId, setActiveConversationId] = useAtom(activeConversationIdAtom);
  const [selectedConversation] = useAtom(selectedConversationAtom);
  const [newMessageText, setNewMessageText] = useAtom(newMessageInputAtom);
  const [searchQuery, setSearchQuery] = useState('');

  const handleConversationClick = (id: string) => {
    setActiveConversationId(id);
  };

  const handleSendMessage = useCallback(() => {
    if (!newMessageText.trim() || !activeConversationId) return;

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === activeConversationId) {
        const newMessage: Message = {
          id: `${conv.id}-${conv.messages.length + 1}`,
          text: newMessageText,
          sender: 'me',
          timestamp: new Date(),
        };

        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessageDate: new Date(),
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessageText('');
  }, [newMessageText, activeConversationId, conversations, setConversations]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatConversationDate = (date: Date) => {
    if (isToday(date)) {
      return 'Today';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'dd/MM/yyyy');
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderMessageGroups = () => {
    if (!selectedConversation) return null;

    // Group messages by date
    const messagesByDate: Record<string, Message[]> = {};
    selectedConversation.messages.forEach((message) => {
      const dateKey = format(message.timestamp, 'yyyy-MM-dd');
      if (!messagesByDate[dateKey]) {
        messagesByDate[dateKey] = [];
      }
      messagesByDate[dateKey].push(message);
    });

    return Object.entries(messagesByDate)
      .map(([dateKey, messages]) => {
        const date = new Date(dateKey);
        const displayDate = formatConversationDate(date);

        return (
          <div key={dateKey} className={css.messageGroup}>
            <div className={css.timestamp}>
              {displayDate}{' '}
              {isToday(date) &&
                messages.length > 0 &&
                format(messages[messages.length - 1].timestamp, 'HH:mm')}
            </div>
            <div className={css.messageList}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={clsx(css.message, {
                    [css.sent]: message.sender === 'me',
                    [css.received]: message.sender === 'other',
                  })}
                >
                  {message.text}
                  {message.sentWithSiri && <div className={css.siriTag}>Sent with Siri</div>}
                </div>
              ))}
            </div>
          </div>
        );
      })
      .reverse(); // Show newest messages at the bottom
  };

  return (
    <section className={css.container}>
      <header className={clsx('app-window-drag-handle', css.titleBar)}></header>

      <div className={css.mainArea}>
        <div className={css.sidebar}>
          <div className={css.searchBar}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onInput={(e: any) => setSearchQuery(e.target.value)}
            />
          </div>

          <ul className={css.conversationList}>
            {filteredConversations.map((conversation) => {
              const lastMessage = conversation.messages[conversation.messages.length - 1];
              return (
                <li
                  key={conversation.id}
                  className={clsx(css.conversationItem, {
                    [css.active]: conversation.id === activeConversationId,
                  })}
                  onClick={() => handleConversationClick(conversation.id)}
                >
                  <div className={css.avatar}>
                    {conversation.contact.avatar ? (
                      <img src={conversation.contact.avatar} alt={conversation.contact.name} />
                    ) : (
                      conversation.contact.name.charAt(0)
                    )}
                  </div>
                  <div className={css.conversationInfo}>
                    <div className={css.topRow}>
                      <span className={css.contactName}>{conversation.contact.name}</span>
                      <span className={css.date}>
                        {formatConversationDate(conversation.lastMessageDate)}
                      </span>
                    </div>
                    <div className={css.lastMessage}>{lastMessage.text}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {selectedConversation ? (
          <div className={css.chatArea}>
            <div className={css.header}>
              <div className={css.contactInfo}>
                <span className={css.contactName}>To: {selectedConversation.contact.name}</span>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px' }}>
                <AppIcon path={mdiVideo} size={20} />
                <AppIcon path={mdiDotsHorizontal} size={20} />
              </div>
            </div>

            <div className={css.messagesContainer}>{renderMessageGroups()}</div>

            <div className={css.inputArea}>
              <textarea
                className={css.inputField}
                placeholder="iMessage"
                value={newMessageText}
                onInput={(e: any) => setNewMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              {newMessageText.trim() && (
                <button className={css.sendButton} onClick={handleSendMessage}>
                  <AppIcon path={mdiSend} size={20} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            className={css.chatArea}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ textAlign: 'center', color: '#8e8e93' }}>
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Messages;
