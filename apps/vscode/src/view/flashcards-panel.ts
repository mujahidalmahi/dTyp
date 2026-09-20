import * as vscode from "vscode";

export interface Flashcard {
	id: string;
	category: string;
	question: string;
	codeSnippet?: string;
	answer: string;
	keyTakeaway: string;
}

export const EXAM_FLASHCARDS: Flashcard[] = [
	{
		id: "card-1",
		category: "Recurrences & Master Theorem",
		question: "What is the asymptotic complexity of T(n) = 2T(n/2) + O(n)?",
		codeSnippet: "T(n) = 2T(n/2) + O(n)\n// MergeSort, Divide-and-Conquer",
		answer: "Case 2 of Master Theorem: a = 2, b = 2, f(n) = n^1. Since log_2(2) = 1 and f(n) = Θ(n^1), the work at each recursion level is equal.",
		keyTakeaway: "Result: Θ(n log n). Standard complexity of MergeSort and optimal comparison sorts.",
	},
	{
		id: "card-2",
		category: "Recurrences & Master Theorem",
		question: "What is the asymptotic complexity of T(n) = T(n/2) + O(1)?",
		codeSnippet: "T(n) = T(n/2) + O(1)\n// Binary Search",
		answer: "Case 2 of Master Theorem with a = 1, b = 2, f(n) = O(1). Halving the search space in constant time at each step.",
		keyTakeaway: "Result: Θ(log n). Typical complexity of Binary Search on sorted arrays.",
	},
	{
		id: "card-3",
		category: "Recurrences & Master Theorem",
		question: "What is the asymptotic complexity of T(n) = 2T(n/2) + O(1)?",
		codeSnippet: "T(n) = 2T(n/2) + O(1)\n// Binary Tree Traversal",
		answer: "Case 1 of Master Theorem: a = 2, b = 2, log_b(a) = 1. Since f(n) = O(1) = O(n^(1 - ε)), the work is dominated by the leaf nodes.",
		keyTakeaway: "Result: Θ(n). Visiting every node in a balanced binary tree takes linear time.",
	},
	{
		id: "card-4",
		category: "Pointers & Memory Mechanics",
		question: "What is the key difference between char* s = \"cat\"; and char s[] = \"cat\";?",
		codeSnippet: "char* s1 = \"cat\"; // Pointer to string literal\nchar s2[] = \"cat\"; // Stack-allocated array",
		answer: "s1 points to read-only string literal in the .rodata segment (modifying `s1[0] = 'b'` causes Segmentation Fault). s2 allocates a 4-byte mutable array on the stack initialized with 'c', 'a', 't', '\\0'.",
		keyTakeaway: "Always use `const char*` for string literals to catch illegal writes at compile time!",
	},
	{
		id: "card-5",
		category: "Pointers & Memory Mechanics",
		question: "Why should you immediately assign ptr = NULL after free(ptr)?",
		codeSnippet: "free(ptr);\nptr = NULL; // Crucial guard",
		answer: "Calling free() returns memory to the OS/allocator, but `ptr` still holds the original memory address (a Dangling Pointer). Any subsequent read/write causes undefined behavior or Use-After-Free vulnerabilities. Setting ptr = NULL prevents accidental reuse, and freeing NULL is guaranteed to be a safe no-op in C.",
		keyTakeaway: "Setting `ptr = NULL` immediately eliminates Dangling Pointer bugs.",
	},
	{
		id: "card-6",
		category: "Pointers & Memory Mechanics",
		question: "What is the difference between sizeof(arr) vs sizeof(ptr)?",
		codeSnippet: "int arr[10];\nint* ptr = arr;\nprintf(\"%zu %zu\\n\", sizeof(arr), sizeof(ptr));",
		answer: "sizeof(arr) returns the total memory size of the array: 10 * 4 = 40 bytes. Once passed to a function, arrays decay into pointers, so sizeof(ptr) returns the machine pointer size (8 bytes on 64-bit systems, 4 bytes on 32-bit).",
		keyTakeaway: "Arrays decay into pointers when passed to functions! Always pass array length as an explicit argument.",
	},
	{
		id: "card-7",
		category: "Bitwise Superpowers & Hacks",
		question: "How does n & (n - 1) work, and what are its main applications?",
		codeSnippet: "// Clears rightmost set bit:\nn = n & (n - 1);",
		answer: "Subtracting 1 flips all bits up to and including the rightmost 1-bit. Performing bitwise AND with original `n` sets that lowest 1-bit to 0. Applications: 1) Check if power of 2: `(n > 0) && ((n & (n - 1)) == 0)`. 2) Count set bits in O(k) time where k is number of 1s (Brian Kernighan's algorithm).",
		keyTakeaway: "`n & (n - 1)` strips the lowest set bit in O(1) CPU cycles.",
	},
	{
		id: "card-8",
		category: "Bitwise Superpowers & Hacks",
		question: "How do you swap two variables without a temporary variable using XOR?",
		codeSnippet: "x ^= y;\ny ^= x;\nx ^= y;",
		answer: "Because A ^ A = 0 and A ^ 0 = A, XOR acts as an invertible toggle. Line 1: x holds x ^ y. Line 2: y becomes y ^ (x ^ y) = x. Line 3: x becomes (x ^ y) ^ x = y.",
		keyTakeaway: "Note: Ensure &x != &y (distinct memory addresses), otherwise XORing with self zeros out the value!",
	},
	{
		id: "card-9",
		category: "Data Structures & Layouts",
		question: "What makes Floyd's Tortoise and Hare cycle detection algorithm O(1) space?",
		codeSnippet: "Node* slow = head;\nNode* fast = head;\nwhile (fast && fast->next) {\n\tslow = slow->next;\n\tfast = fast->next->next;\n\tif (slow == fast) return 1; // Cycle!\n}",
		answer: "Instead of hashing visited pointers (which requires O(N) memory), two pointers move at speeds 1 and 2. In any cyclic loop of length C, the relative distance between them decreases by 1 node per iteration, guaranteeing they collide within the cycle.",
		keyTakeaway: "Floyd's algorithm detects linked list loops in O(N) time using strictly O(1) auxiliary memory.",
	},
	{
		id: "card-10",
		category: "Sorting & Searching Complexities",
		question: "Why does QuickSort have O(N^2) worst-case, and how do we prevent it in practice?",
		codeSnippet: "// Worst-case: already sorted array with first element as pivot\n// Best/Avg: O(N log N)",
		answer: "If the chosen pivot is always the smallest or largest element, the partitioning splits into 0 and N-1 elements, producing an unbalanced recursion tree of depth N (N * N/2 comparisons = O(N^2)).",
		keyTakeaway: "Prevented via Randomized Pivot selection, Median-of-Three pivot, or Introsort (switching to HeapSort when recursion exceeds 2 log N).",
	},
];

export class FlashcardsPanel {
	public static currentPanel: FlashcardsPanel | null = null;
	private readonly panel: vscode.WebviewPanel;
	private disposables: vscode.Disposable[] = [];
	private currentIndex = 0;
	private masteredIds = new Set<string>();
	private activeCategory = "All";

	private constructor(panel: vscode.WebviewPanel, private extensionUri: vscode.Uri) {
		this.panel = panel;
		this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
		this.panel.webview.onDidReceiveMessage(
			(message) => {
				switch (message.command) {
					case "next":
						this.navigate(1);
						break;
					case "prev":
						this.navigate(-1);
						break;
					case "toggleMastered":
						const card = this.getCurrentCard();
						if (card) {
							if (this.masteredIds.has(card.id)) {
								this.masteredIds.delete(card.id);
							} else {
								this.masteredIds.add(card.id);
							}
							this.updateWebview();
						}
						break;
					case "setCategory":
						this.activeCategory = message.category;
						this.currentIndex = 0;
						this.updateWebview();
						break;
				}
			},
			null,
			this.disposables
		);

		this.updateWebview();
	}

	public static show(extensionUri: vscode.Uri): FlashcardsPanel {
		const column = vscode.window.activeTextEditor ? vscode.ViewColumn.Beside : vscode.ViewColumn.One;

		if (FlashcardsPanel.currentPanel) {
			FlashcardsPanel.currentPanel.panel.reveal(column);
			FlashcardsPanel.currentPanel.updateWebview();
			return FlashcardsPanel.currentPanel;
		}

		const panel = vscode.window.createWebviewPanel(
			"dtypFlashcards",
			"dTyp Exam Flashcards",
			column,
			{
				enableScripts: true,
				retainContextWhenHidden: true,
			}
		);

		FlashcardsPanel.currentPanel = new FlashcardsPanel(panel, extensionUri);
		return FlashcardsPanel.currentPanel;
	}

	private getFilteredCards(): Flashcard[] {
		if (this.activeCategory === "All") return EXAM_FLASHCARDS;
		return EXAM_FLASHCARDS.filter((c) => c.category === this.activeCategory);
	}

	private getCurrentCard(): Flashcard | null {
		const cards = this.getFilteredCards();
		if (cards.length === 0) return null;
		return cards[this.currentIndex % cards.length];
	}

	private navigate(delta: number): void {
		const cards = this.getFilteredCards();
		if (cards.length === 0) return;
		this.currentIndex = (this.currentIndex + delta + cards.length) % cards.length;
		this.updateWebview();
	}

	private updateWebview(): void {
		const cards = this.getFilteredCards();
		const currentCard = this.getCurrentCard();
		const categories = ["All", ...Array.from(new Set(EXAM_FLASHCARDS.map((c) => c.category)))];
		const masteredCount = this.masteredIds.size;
		const totalCards = EXAM_FLASHCARDS.length;

		this.panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>dTyp Exam Flashcards</title>
	<style>
		body {
			background: #1e1e1e;
			color: #cccccc;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
			padding: 20px;
			margin: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.container {
			max-width: 650px;
			width: 100%;
		}
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 16px;
			border-bottom: 1px solid #333333;
			padding-bottom: 10px;
		}
		.title { font-size: 1.3rem; font-weight: 700; color: #58a6ff; }
		.stats { font-size: 0.85rem; color: #888888; }
		.category-bar {
			display: flex;
			gap: 6px;
			flex-wrap: wrap;
			margin-bottom: 16px;
		}
		.cat-btn {
			background: #2d333b;
			color: #cdd9e5;
			border: 1px solid #444c56;
			border-radius: 20px;
			padding: 4px 12px;
			font-size: 0.8rem;
			cursor: pointer;
		}
		.cat-btn.active {
			background: #1f6feb;
			color: white;
			border-color: #58a6ff;
		}
		/* Flashcard 3D perspective */
		.card-wrapper {
			perspective: 1000px;
			min-height: 280px;
			cursor: pointer;
			margin-bottom: 16px;
		}
		.card-inner {
			position: relative;
			width: 100%;
			min-height: 280px;
			transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
			transform-style: preserve-3d;
			border-radius: 10px;
		}
		.card-inner.is-flipped {
			transform: rotateY(180deg);
		}
		.card-face {
			position: absolute;
			width: 100%;
			min-height: 280px;
			box-sizing: border-box;
			backface-visibility: hidden;
			border-radius: 10px;
			padding: 24px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			border: 1px solid #3c3c3c;
		}
		.card-front {
			background: #252526;
		}
		.card-back {
			background: #1c2128;
			border-color: #388bfd;
			transform: rotateY(180deg);
		}
		.badge {
			font-size: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			color: #58a6ff;
			font-weight: 700;
		}
		.question {
			font-size: 1.15rem;
			font-weight: 600;
			color: #ffffff;
			margin: 12px 0;
			line-height: 1.4;
		}
		.code {
			background: #161b22;
			border-radius: 6px;
			padding: 10px;
			font-family: monospace;
			font-size: 0.85rem;
			color: #e6edf3;
			white-space: pre-wrap;
			margin-bottom: 12px;
		}
		.answer {
			font-size: 0.95rem;
			color: #cdd9e5;
			line-height: 1.5;
			margin-bottom: 12px;
		}
		.takeaway {
			background: rgba(56, 139, 253, 0.15);
			border-left: 3px solid #58a6ff;
			padding: 8px 12px;
			font-size: 0.85rem;
			color: #79c0ff;
			border-radius: 0 4px 4px 0;
		}
		.flip-hint {
			font-size: 0.75rem;
			color: #888888;
			text-align: right;
		}
		.controls {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		button.nav-btn {
			background: #21262d;
			color: #c9d1d9;
			border: 1px solid #30363d;
			padding: 8px 16px;
			border-radius: 6px;
			font-weight: 600;
			cursor: pointer;
		}
		button.nav-btn:hover { background: #30363d; }
		button.master-btn {
			background: #238636;
			color: white;
			border: none;
			padding: 8px 16px;
			border-radius: 6px;
			font-weight: 600;
			cursor: pointer;
		}
		button.master-btn.mastered {
			background: #8957e5;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<div>
				<div class="title">🎓 dTyp Exam Flashcards</div>
				<div class="stats">Card ${this.currentIndex + 1} of ${cards.length} &bull; Mastered: ${masteredCount}/${totalCards} (${Math.round((masteredCount / totalCards) * 100)}%)</div>
			</div>
		</div>

		<div class="category-bar">
			${categories
				.map(
					(cat) =>
						`<button class="cat-btn ${cat === this.activeCategory ? "active" : ""}" onclick="setCategory('${cat}')">${cat}</button>`
				)
				.join("")}
		</div>

		${
			currentCard
				? `
		<div class="card-wrapper" onclick="toggleFlip()">
			<div class="card-inner" id="cardInner">
				<div class="card-face card-front">
					<div>
						<div class="badge">${currentCard.category}</div>
						<div class="question">${currentCard.question}</div>
						${currentCard.codeSnippet ? `<div class="code">${currentCard.codeSnippet}</div>` : ""}
					</div>
					<div class="flip-hint">💡 Click card to reveal answer & recurrence</div>
				</div>

				<div class="card-face card-back">
					<div>
						<div class="badge" style="color:#3fb950;">Explanation & Analysis</div>
						<div class="answer">${currentCard.answer}</div>
						<div class="takeaway"><strong>Key Takeaway:</strong> ${currentCard.keyTakeaway}</div>
					</div>
					<div class="flip-hint">💡 Click card to flip back</div>
				</div>
			</div>
		</div>

		<div class="controls">
			<button class="nav-btn" onclick="prevCard(event)">◀ Previous</button>
			<button class="master-btn ${this.masteredIds.has(currentCard.id) ? "mastered" : ""}" onclick="toggleMastered(event)">
				${this.masteredIds.has(currentCard.id) ? "★ Mastered" : "☆ Mark Mastered"}
			</button>
			<button class="nav-btn" onclick="nextCard(event)">Next ▶</button>
		</div>
		`
				: `<div style="text-align:center; padding:40px; color:#888888;">No flashcards found in this category.</div>`
		}
	</div>

	<script>
		const vscode = acquireVsCodeApi();

		function toggleFlip() {
			const el = document.getElementById("cardInner");
			if (el) el.classList.toggle("is-flipped");
		}

		function prevCard(e) {
			e.stopPropagation();
			vscode.postMessage({ command: "prev" });
		}

		function nextCard(e) {
			e.stopPropagation();
			vscode.postMessage({ command: "next" });
		}

		function toggleMastered(e) {
			e.stopPropagation();
			vscode.postMessage({ command: "toggleMastered" });
		}

		function setCategory(cat) {
			vscode.postMessage({ command: "setCategory", category: cat });
		}
	</script>
</body>
</html>`;
	}

	public dispose(): void {
		FlashcardsPanel.currentPanel = null;
		this.panel.dispose();
		while (this.disposables.length) {
			const d = this.disposables.pop();
			if (d) d.dispose();
		}
	}
}
