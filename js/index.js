var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var station = [{
  name: 'Victoria',
  line: 'Victoria',
  zone: 'Zone 1',
  twitter: 'dancounsell'
}, {
  name: 'Elephant & Castle',
  line: 'Northern',
  zone: '1 & 2',
  twitter: 'dancounsell'
}];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  var escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  var regex = new RegExp('\\b' + escapedValue, 'i');

  return station.filter(function (person) {
    return regex.test(getSuggestionValue(person));
  });
}

function getSuggestionValue(suggestion) {
  return suggestion.name; + '' + suggestion.line;
}

function renderSuggestion(suggestion, _ref) {
  var query = _ref.query;

  var suggestionText = suggestion.name + ', ' + suggestion.zone + ', ' + suggestion.line;
  var matches = AutosuggestHighlightMatch(suggestionText, query);
  var parts = AutosuggestHighlightParse(suggestionText, matches);

  return React.createElement(
    'span',
    { className: 'suggestion-content ' + suggestion.twitter },
    React.createElement(
      'span',
      { className: 'name' },
      parts.map(function (part, index) {
        var className = part.highlight ? 'highlight' : null;

        return React.createElement(
          'span',
          { className: className, key: index },
          part.text
        );
      })
    )
  );
}

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.onChange = function (event, _ref2) {
      var newValue = _ref2.newValue,
          method = _ref2.method;

      _this.setState({
        value: newValue
      });
    };

    _this.onSuggestionsFetchRequested = function (_ref3) {
      var value = _ref3.value;

      _this.setState({
        suggestions: getSuggestions(value)
      });
    };

    _this.onSuggestionsClearRequested = function () {
      _this.setState({
        suggestions: []
      });
    };

    _this.state = {
      value: '',
      suggestions: []
    };
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          value = _state.value,
          suggestions = _state.suggestions;

      var inputProps = {
        placeholder: "Search for a Station",
        value: value,
        onChange: this.onChange
      };

      return React.createElement(Autosuggest, {
        suggestions: suggestions,
        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
        getSuggestionValue: getSuggestionValue,
        renderSuggestion: renderSuggestion,
        inputProps: inputProps });
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
