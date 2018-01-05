import * as React from "react";
import TwilioChat from "twilio-chat";

import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import * as $ from "jquery";
import "./App.css";

type AppProps = {};
type AppState = {
    messages: any[any];
    username: any;
    channel: any;
};

class App extends React.Component<AppProps, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            messages: [],
            username: null,
            channel: null,
        };
    }

    componentDidMount() {
        this.getToken()
            .then(this.createChatClient)
            .then(this.joinGeneralChannel)
            .then(this.configureChannelEvents)
            .catch((error) => {
                this.addMessage({ body: `Error: ${error.message}` });
            });
    }

    getToken = () => {
        return new Promise((resolve, reject) => {
            this.addMessage({ body: "Connecting..." });

            $.getJSON("/token", (token) => {
                this.setState({ username: token.identity });
                resolve(token);
            }).fail(() => {
                reject(Error("Failed to connect."));
            });
        });
    };

    createChatClient = (token: any) => {
        return new Promise((resolve, reject) => {
            resolve(new TwilioChat(token.jwt));
        });
    };

    joinGeneralChannel = (chatClient: any) => {
        return new Promise((resolve, reject) => {
            chatClient
                .getSubscribedChannels()
                .then(() => {
                    chatClient
                        .getChannelByUniqueName("general")
                        .then((channel: any) => {
                            this.addMessage({
                                body: "Joining general channel...",
                            });
                            this.setState({ channel });

                            channel
                                .join()
                                .then(() => {
                                    this.addMessage({
                                        body: `Joined general channel as ${
                                            this.state.username
                                        }`,
                                    });
                                    window.addEventListener(
                                        "beforeunload",
                                        () => channel.leave(),
                                    );
                                })
                                .catch(() =>
                                    reject(
                                        Error(
                                            "Could not join general channel.",
                                        ),
                                    ),
                                );

                            resolve(channel);
                        })
                        .catch(() => this.createGeneralChannel(chatClient));
                })
                .catch(() => reject(Error("Could not get channel list.")));
        });
    };

    createGeneralChannel = (chatClient: any) => {
        return new Promise((resolve, reject) => {
            this.addMessage({ body: "Creating general channel..." });
            chatClient
                .createChannel({
                    uniqueName: "general",
                    friendlyName: "General Chat",
                })
                .then(() => this.joinGeneralChannel(chatClient))
                .catch(() =>
                    reject(Error("Could not create general channel.")),
                );
        });
    };

    addMessage = (message: any) => {
        const messageData = {
            ...message,
            me: message.author === this.state.username,
        };
        this.setState({
            messages: [...this.state.messages, messageData],
        });
    };

    handleNewMessage = (text: string) => {
        if (this.state.channel) {
            this.state.channel.sendMessage(text);
        }
    };

    configureChannelEvents = (channel: any) => {
        channel.on(
            "messageAdded",
            ({ author, body }: { author: any; body: any }) => {
                this.addMessage({ author, body });
            },
        );

        channel.on("memberJoined", (member: any) => {
            this.addMessage({
                body: `${member.identity} has joined the channel.`,
            });
        });

        channel.on("memberLeft", (member: any) => {
            this.addMessage({
                body: `${member.identity} has left the channel.`,
            });
        });
    };

    render() {
        return (
            <div className="App">
                <MessageList messages={this.state.messages} />
                <MessageForm onMessageSend={this.handleNewMessage} />
            </div>
        );
    }
}

export default App;
