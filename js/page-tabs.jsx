/*
<div class="page-tabs-settings tab no-select">
    <div class="img" style="background: url('./imgs/settings_icon.png') no-repeat center center;"></div>
    <div class="title">Settings</div>
    <div id="notification-count" style="display: none;"></div>
</div>
*/

var PageTab = React.createClass({
    getInitialState: function() {
        return {isSelected: false};
    },
    onClicked: function() {
        this.setState({isSelected: true});
        this.props.callbackParent(this.props.name, this.props.target);
    },
    render: function() {
        var elemStyle = {
            background: "url('./imgs/" + this.props.name.toLowerCase() + "_icon.png') no-repeat center center"
        };
        var notificationStyle = {
            display: (this.props.notificationCount > 0 ? "block" : "none")
        }
        var classname = classNames(
            "page-tabs-" + this.props.name.toLowerCase(),
            "tab",
            "no-select",
            { "selected": this.props.selected == this.props.name }
        );
        return (
            <div className={classname} onClick={this.onClicked}>
                <div className="img" style={elemStyle}></div>
                <div className="title">
                    {this.props.name}
                </div>
                <div id="notification-count" style={notificationStyle}>
                    +{this.props.notificationCount}
                </div>
            </div>
        );
    }
});

var PageTabBar = React.createClass({
    getInitialState: function() {
        return {
            selected: this.props.items[0][0]
        }
    },
    handleClick: function(e, t) {
        this.setState({selected: e});
    },
    render: function() {
        var self = this;
        var buildNews = (this.props.isNews != null);
        return (
            <div>
                {this.props.items.map(function(item, i) {
                    return (
                        <PageTab name={item[0]} notificationCount={item[1]} key={i} selected={self.state.selected} callbackParent={self.handleClick}/>
                    );
                })}
            </div>
        );
    }
});

function CreatePageBar(e, t)
{
    ReactDOM.render(<PageTabBar items={e} />, document.getElementById(t));
}
