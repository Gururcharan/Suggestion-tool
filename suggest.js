class TrieNode {
  constructor() {
    this.children = {};
    this.endOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.endOfWord = true;
  }

  search(prefix) {
    let node = this.root;
    for (let ch of prefix) {
      if (!node.children[ch]) return [];
      node = node.children[ch];
    }
    return this._getWords(node, prefix);
  }

  _getWords(node, prefix) {
    let results = [];
    if (node.endOfWord) results.push(prefix);
    for (let ch in node.children) {
      results = results.concat(this._getWords(node.children[ch], prefix + ch));
    }
    return results;
  }
}

const trie = new Trie();

// Sample dictionary
["apple", "app", "apply", "apt", "bat", "ball", "banana", "cat", "cap", "cape"].forEach(word => trie.insert(word));

function showSuggestions() {
  const prefix = document.getElementById("input").value.toLowerCase();
  const list = document.getElementById("suggestions");
  list.innerHTML = "";

  if (!prefix) return;

  const suggestions = trie.search(prefix);
  if (suggestions.length === 0) {
    list.innerHTML = "<li class='text-red-500'>No suggestions</li>";
  } else {
    suggestions.forEach(word => {
      const li = document.createElement("li");
      li.textContent = word;
      list.appendChild(li);
    });
  }
}
