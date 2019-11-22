/**
 * 链表节点
 */
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
/**
 * 链表
 */
class List {
    constructor() {
        this.create(...arguments);
    }
    /**
     * 生成链表
     */
    create() {
        var len = arguments.length;
        if (!len) {
            return this.head = null;
        }
        // 节点
        var Node = function (val) {
            this.val = val;
            this.next = null;
        }
        this.head = new Node(arguments[0]);
        var curr = this.head;
        for (var i = 1; i < len; i++) {
            curr.next = new Node(arguments[i]);
            curr = curr.next;
        }
    }
    /**
     * 链表序列化
     * @param {String} divide 分隔符
     */
    stringify(divide = ' ') {
        var curr = this.head;
        var res = '';
        while (curr) {
            res += curr.val + divide;
            curr = curr.next;
        }
        res = res.substring(0, res.length - divide.length);
        return res;
    }
    add(val) {
        var curr = this.head;
        if (!curr) {
            this.head = new ListNode(val);
            return;
        }
        while (curr.next) {
            curr = curr.next;
        }
        curr.next = new ListNode(val);
    }
    reverse() {
        if (!this.head) {
            return null;
        }
        var prev = null;
        var curr = this.head;
        while (curr) {
            var next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        this.head = prev;
    }
    getLastNode() {
        var prev = this.head;
        if (!prev) {
            return null;
        }
        var curr = prev.next;
        while (curr) {
            prev = curr;
            curr = curr.next;
        }
        return prev;
    }
    remove(target) {
        var prev = this.head;
        while (prev && prev.val === target) {
            prev = prev.next;
        }
        if (!prev) {
            return null;
        }
        this.head = prev;
        var curr = prev.next;
        while (curr) {
            var next = curr.next;
            if (curr.val === target) {
                prev.next = next;
                curr = next;
            } else {
                prev = curr;
                curr = next;
            }
        }
    }
}

/**
 * 二叉树节点
 */
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
/**
 * 二叉树
 */
class BinaryTree {
    constructor() {
        this.root = null;
        this.create(...arguments);
    }
    create() {
        var data = [...arguments];
        var len = data.length;
        if (len) {
            this.root = new TreeNode(data[0], 0, 1);
        }
        var appendChild = function (root, index, height) {
            var leftIndex = Math.pow(2, height) + index * 2 - 1;
            var rightIndex = leftIndex + 1;
            if (leftIndex < len) {
                root.left = data[leftIndex] ? new TreeNode(data[leftIndex]) : null;
                appendChild(root.left, index * 2, height + 1);
            }
            if (rightIndex < len) {
                root.right = data[rightIndex] ? new TreeNode(data[rightIndex]) : null;
                appendChild(root.right, index * 2 + 1, height + 1);
            }
        }
        appendChild(this.root, 0, 1);
    }
    maxDepth() {
        var maxDepth = function (root) {
            if (root) {
                return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
            }
            return 0;
        }
        return maxDepth(this.root);
    }
    treeToArr() {
        var root = this.root;
        if (!root) {
            return [];
        }
        var queue = [];
        var res = [];
        // 入队
        queue.push(root);
        while (queue.length) {
            var node = queue.pop();
            if (!node) {
                res.push(null);
            } else {
                res.push(node.val);
                if (node.left || node.right) {
                    queue.unshift(node.right, node.left);
                }
            }
        }
        return res;
    }
}

/**
 * 二叉搜索树
 */
class BinarySearchTree extends BinaryTree {
    constructor() {
        super(...arguments);
        this.root = null;
        this.create(...arguments);
    }
    create() {
        var len = arguments.length;
        if (!len) {
            return null;
        }
        this.root = new TreeNode(arguments[0]);
        for (var i = 1; i < len; i++) {
            this.add(arguments[i]);
        }
    }
    add(val) {
        var prev = this.root;
        var curr = prev;
        while (curr) {
            prev = curr;
            if (val < curr.val) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }
        if (val < prev.val) {
            prev.left = new TreeNode(val);
        } else {
            prev.right = new TreeNode(val);
        }
    }
    clone() {
        var root = this.root;
        if (!root) {
            return null;
        }
        var newTree = new BinarySearchTree(root.val);
        var fn = function (newNode, oldNode, flag) {
            if (!oldNode) {
                return null;
            }
            var node = new TreeNode(oldNode.val);
            var next;
            if (flag === 0) {
                newNode.left = node;
                next = node;
            } else {
                newNode.right = node;
                next = node;
            }
            fn(next, oldNode.left, 0);
            fn(next, oldNode.right, 1);
        }
        fn(newTree.root, root.left, 0);
        fn(newTree.root, root.right, 1);
        return newTree;
    }
}