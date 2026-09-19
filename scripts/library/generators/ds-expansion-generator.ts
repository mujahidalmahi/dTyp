// Auto-generated comprehensive DS Expansion Generator for dTyp v3.1.0
import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateExpandedSinglyComponents(): Component[] {
  const singlyNodeId = "linkedList.node";
  const singlyCreateNodeId = "linkedList.createNode";
  const singlyInsertHeadId = "data-structures.separate-components.linked-lists.singly.insert-head";

  return [
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.insert-at-position",
      name: "singly_insert_at_position",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/insert-at-position",
      description: "Inserts new node at 1-based index in singly linked list",
      signature: "int singly_insert_at_position(Node** head, int pos, int data);",
      code: `int singly_insert_at_position(Node** head, int pos, int data) {
    if (pos < 1) return 0;
    if (pos == 1) {
        singly_insert_head(head, data);
        return 1;
    }
    Node* cur = *head;
    for (int i = 1; cur && i < pos - 1; i++) cur = cur->next;
    if (!cur) return 0;
    Node* n = createNode(data);
    if (!n) return 0;
    n->next = cur->next;
    cur->next = n;
    return 1;
}`,
      dependencies: [singlyNodeId, singlyCreateNodeId, singlyInsertHeadId],
      tags: ["linked-list", "singly", "insert", "position"],
      aliases: ["singly_insert_at_position", "insertAtPositionSingly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.insert-sorted",
      name: "singly_insert_sorted",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/insert-sorted",
      description: "Inserts value into ascending sorted singly linked list",
      signature: "void singly_insert_sorted(Node** head, int data);",
      code: `void singly_insert_sorted(Node** head, int data) {
    Node* n = createNode(data);
    if (!n) return;
    if (!*head || (*head)->data >= data) {
        n->next = *head;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    cur->next = n;
}`,
      dependencies: [singlyNodeId, singlyCreateNodeId],
      tags: ["linked-list", "singly", "insert", "sorted"],
      aliases: ["singly_insert_sorted", "insertSortedSingly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.delete-beginning",
      name: "singly_delete_beginning",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/delete-beginning",
      description: "Deletes head node of singly linked list and outputs value",
      signature: "int singly_delete_beginning(Node** head, int* val);",
      code: `int singly_delete_beginning(Node** head, int* val) {
    if (!head || !*head) return 0;
    Node* tmp = *head;
    *val = tmp->data;
    *head = (*head)->next;
    free(tmp);
    return 1;
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "delete", "beginning"],
      aliases: ["singly_delete_beginning", "deleteBeginningSingly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.delete-end",
      name: "singly_delete_end",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/delete-end",
      description: "Deletes tail node of singly linked list and outputs value",
      signature: "int singly_delete_end(Node** head, int* val);",
      code: `int singly_delete_end(Node** head, int* val) {
    if (!head || !*head) return 0;
    if (!(*head)->next) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return 1;
    }
    Node* cur = *head;
    while (cur->next->next) cur = cur->next;
    *val = cur->next->data;
    free(cur->next);
    cur->next = NULL;
    return 1;
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "delete", "end"],
      aliases: ["singly_delete_end", "deleteEndSingly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.delete-at-position",
      name: "singly_delete_at_position",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/delete-at-position",
      description: "Deletes node at 1-based index from singly linked list",
      signature: "int singly_delete_at_position(Node** head, int pos, int* val);",
      code: `int singly_delete_at_position(Node** head, int pos, int* val) {
    if (!head || !*head || pos < 1) return 0;
    if (pos == 1) {
        Node* tmp = *head;
        *val = tmp->data;
        *head = (*head)->next;
        free(tmp);
        return 1;
    }
    Node* cur = *head;
    for (int i = 1; cur && i < pos - 1; i++) cur = cur->next;
    if (!cur || !cur->next) return 0;
    Node* tmp = cur->next;
    *val = tmp->data;
    cur->next = tmp->next;
    free(tmp);
    return 1;
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "delete", "position"],
      aliases: ["singly_delete_at_position", "deleteAtPositionSingly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.delete-after",
      name: "singly_delete_after",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/delete-after",
      description: "Deletes node immediately following target value",
      signature: "int singly_delete_after(Node* head, int target, int* val);",
      code: `int singly_delete_after(Node* head, int target, int* val) {
    Node* cur = head;
    while (cur && cur->data != target) cur = cur->next;
    if (!cur || !cur->next) return 0;
    Node* del = cur->next;
    *val = del->data;
    cur->next = del->next;
    free(del);
    return 1;
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "delete", "after"],
      aliases: ["singly_delete_after", "deleteAfterSingly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.reverse",
      name: "singly_reverse",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/reverse",
      description: "Reverses singly linked list in-place",
      signature: "void singly_reverse(Node** head);",
      code: `void singly_reverse(Node** head) {
    Node* prev = NULL;
    Node* cur = *head;
    Node* nxt = NULL;
    while (cur) {
        nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    *head = prev;
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "reverse"],
      aliases: ["singly_reverse", "reverseSinglyList"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.sort",
      name: "singly_sort",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/sort",
      description: "Sorts singly linked list elements in ascending order",
      signature: "void singly_sort(Node* head);",
      code: `void singly_sort(Node* head) {
    if (!head || !head->next) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next) {
            if (cur->data > cur->next->data) {
                int tmp = cur->data;
                cur->data = cur->next->data;
                cur->next->data = tmp;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "sort"],
      aliases: ["singly_sort", "sortSinglyList"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.find-middle",
      name: "singly_find_middle",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/find-middle",
      description: "Finds middle node value using two-pointer algorithm",
      signature: "int singly_find_middle(const Node* head, int* val);",
      code: `int singly_find_middle(const Node* head, int* val) {
    if (!head) return 0;
    const Node* slow = head;
    const Node* fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    *val = slow->data;
    return 1;
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "middle"],
      aliases: ["singly_find_middle", "findMiddleSingly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.detect-cycle",
      name: "singly_detect_cycle",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/detect-cycle",
      description: "Detects cycle in singly linked list using Floyd algorithm",
      signature: "int singly_detect_cycle(const Node* head);",
      code: `int singly_detect_cycle(const Node* head) {
    if (!head || !head->next) return 0;
    const Node* slow = head;
    const Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return 1;
    }
    return 0;
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "cycle", "detection"],
      aliases: ["singly_detect_cycle", "detectCycleSingly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.remove-duplicates",
      name: "singly_remove_duplicates",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/remove-duplicates",
      description: "Removes all duplicate values from singly linked list",
      signature: "void singly_remove_duplicates(Node* head);",
      code: `void singly_remove_duplicates(Node* head) {
    Node* cur = head;
    while (cur && cur->next) {
        Node* runner = cur;
        while (runner->next) {
            if (runner->next->data == cur->data) {
                Node* del = runner->next;
                runner->next = del->next;
                free(del);
            } else {
                runner = runner->next;
            }
        }
        cur = cur->next;
    }
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "duplicates"],
      aliases: ["singly_remove_duplicates", "removeDuplicatesSingly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.display",
      name: "singly_display",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/display",
      description: "Prints all elements of singly linked list to stdout",
      signature: "void singly_display(const Node* head);",
      code: `void singly_display(const Node* head) {
    const Node* cur = head;
    while (cur) {
        printf("%d -> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\\n");
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "display"],
      aliases: ["singly_display", "printSinglyList"],
    }),
  ];
}

// =========================================================================
// 2. DOUBLY LINKED LIST EXPANSION
// =========================================================================
export function generateExpandedDoublyComponents(): Component[] {
  const doublyNodeId = "data-structures.separate-components.linked-lists.doubly.node";
  const doublyCreateNodeId = "data-structures.separate-components.linked-lists.doubly.create-node";
  const doublyInsertHeadId = "data-structures.separate-components.linked-lists.doubly.insert-head";

  return [
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.insert-at-position",
      name: "doubly_insert_at_position",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/insert-at-position",
      description: "Inserts node at 1-based position in doubly linked list",
      signature: "int doubly_insert_at_position(Node** head, int pos, int data);",
      code: `int doubly_insert_at_position(Node** head, int pos, int data) {
    if (pos < 1) return 0;
    if (pos == 1) {
        doubly_insert_head(head, data);
        return 1;
    }
    Node* cur = *head;
    for (int i = 1; cur && i < pos - 1; i++) cur = cur->next;
    if (!cur) return 0;
    Node* n = doubly_create_node(data);
    if (!n) return 0;
    n->next = cur->next;
    n->prev = cur;
    if (cur->next) cur->next->prev = n;
    cur->next = n;
    return 1;
}`,
      dependencies: [doublyNodeId, doublyCreateNodeId, doublyInsertHeadId],
      tags: ["linked-list", "doubly", "insert", "position"],
      aliases: ["doubly_insert_at_position", "insertAtPositionDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.insert-sorted",
      name: "doubly_insert_sorted",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/insert-sorted",
      description: "Inserts value in ascending order into doubly linked list",
      signature: "void doubly_insert_sorted(Node** head, int data);",
      code: `void doubly_insert_sorted(Node** head, int data) {
    Node* n = doubly_create_node(data);
    if (!n) return;
    if (!*head || (*head)->data >= data) {
        n->next = *head;
        if (*head) (*head)->prev = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    n->prev = cur;
    if (cur->next) cur->next->prev = n;
    cur->next = n;
}`,
      dependencies: [doublyNodeId, doublyCreateNodeId],
      tags: ["linked-list", "doubly", "insert", "sorted"],
      aliases: ["doubly_insert_sorted", "insertSortedDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.delete-beginning",
      name: "doubly_delete_beginning",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/delete-beginning",
      description: "Deletes head node of doubly linked list and outputs value",
      signature: "int doubly_delete_beginning(Node** head, int* val);",
      code: `int doubly_delete_beginning(Node** head, int* val) {
    if (!head || !*head) return 0;
    Node* tmp = *head;
    *val = tmp->data;
    *head = (*head)->next;
    if (*head) (*head)->prev = NULL;
    free(tmp);
    return 1;
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "delete", "beginning"],
      aliases: ["doubly_delete_beginning", "deleteBeginningDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.delete-end",
      name: "doubly_delete_end",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/delete-end",
      description: "Deletes tail node of doubly linked list and outputs value",
      signature: "int doubly_delete_end(Node** head, int* val);",
      code: `int doubly_delete_end(Node** head, int* val) {
    if (!head || !*head) return 0;
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    *val = cur->data;
    if (cur->prev) cur->prev->next = NULL;
    else *head = NULL;
    free(cur);
    return 1;
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "delete", "end"],
      aliases: ["doubly_delete_end", "deleteEndDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.delete-at-position",
      name: "doubly_delete_at_position",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/delete-at-position",
      description: "Deletes node at 1-based index from doubly linked list",
      signature: "int doubly_delete_at_position(Node** head, int pos, int* val);",
      code: `int doubly_delete_at_position(Node** head, int pos, int* val) {
    if (!head || !*head || pos < 1) return 0;
    Node* cur = *head;
    for (int i = 1; cur && i < pos; i++) cur = cur->next;
    if (!cur) return 0;
    *val = cur->data;
    if (cur->prev) cur->prev->next = cur->next;
    else *head = cur->next;
    if (cur->next) cur->next->prev = cur->prev;
    free(cur);
    return 1;
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "delete", "position"],
      aliases: ["doubly_delete_at_position", "deleteAtPositionDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.delete-after",
      name: "doubly_delete_after",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/delete-after",
      description: "Deletes node immediately following target value in doubly linked list",
      signature: "int doubly_delete_after(Node* head, int target, int* val);",
      code: `int doubly_delete_after(Node* head, int target, int* val) {
    Node* cur = head;
    while (cur && cur->data != target) cur = cur->next;
    if (!cur || !cur->next) return 0;
    Node* del = cur->next;
    *val = del->data;
    cur->next = del->next;
    if (del->next) del->next->prev = cur;
    free(del);
    return 1;
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "delete", "after"],
      aliases: ["doubly_delete_after", "deleteAfterDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.delete-value",
      name: "doubly_delete_value",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/delete-value",
      description: "Deletes first occurrence of given value in doubly linked list",
      signature: "int doubly_delete_value(Node** head, int val);",
      code: `int doubly_delete_value(Node** head, int val) {
    if (!head || !*head) return 0;
    Node* cur = *head;
    while (cur && cur->data != val) cur = cur->next;
    if (!cur) return 0;
    if (cur == *head) *head = cur->next;
    if (cur->prev) cur->prev->next = cur->next;
    if (cur->next) cur->next->prev = cur->prev;
    free(cur);
    return 1;
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "delete", "value"],
      aliases: ["doubly_delete_value", "deleteValueDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.search",
      name: "doubly_search",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/search",
      description: "Searches for value in doubly linked list and returns node pointer",
      signature: "Node* doubly_search(Node* head, int val);",
      code: `Node* doubly_search(Node* head, int val) {
    Node* cur = head;
    while (cur) {
        if (cur->data == val) return cur;
        cur = cur->next;
    }
    return NULL;
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "search"],
      aliases: ["doubly_search", "searchDoublyList"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.count",
      name: "doubly_count",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/count",
      description: "Counts total number of nodes in doubly linked list",
      signature: "int doubly_count(const Node* head);",
      code: `int doubly_count(const Node* head) {
    int cnt = 0;
    const Node* cur = head;
    while (cur) {
        cnt++;
        cur = cur->next;
    }
    return cnt;
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "count"],
      aliases: ["doubly_count", "countNodesDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.min-max",
      name: "doubly_min_max",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/min-max",
      description: "Finds minimum and maximum element values in doubly linked list",
      signature: "void doubly_min_max(const Node* head, int* min_val, int* max_val);",
      code: `void doubly_min_max(const Node* head, int* min_val, int* max_val) {
    if (!head) return;
    *min_val = head->data;
    *max_val = head->data;
    const Node* cur = head->next;
    while (cur) {
        if (cur->data < *min_val) *min_val = cur->data;
        if (cur->data > *max_val) *max_val = cur->data;
        cur = cur->next;
    }
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "min", "max"],
      aliases: ["doubly_min_max", "minMaxDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.reverse",
      name: "doubly_reverse",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/reverse",
      description: "Reverses doubly linked list by swapping prev and next pointers",
      signature: "void doubly_reverse(Node** head);",
      code: `void doubly_reverse(Node** head) {
    if (!*head) return;
    Node* cur = *head;
    Node* tmp = NULL;
    while (cur) {
        tmp = cur->prev;
        cur->prev = cur->next;
        cur->next = tmp;
        cur = cur->prev;
    }
    if (tmp) *head = tmp->prev;
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "reverse"],
      aliases: ["doubly_reverse", "reverseDoublyList"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.sort",
      name: "doubly_sort",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/sort",
      description: "Sorts doubly linked list in ascending numerical order",
      signature: "void doubly_sort(Node* head);",
      code: `void doubly_sort(Node* head) {
    if (!head || !head->next) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next) {
            if (cur->data > cur->next->data) {
                int t = cur->data;
                cur->data = cur->next->data;
                cur->next->data = t;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "sort"],
      aliases: ["doubly_sort", "sortDoublyList"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.find-middle",
      name: "doubly_find_middle",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/find-middle",
      description: "Finds middle node in doubly linked list via fast/slow pointers",
      signature: "int doubly_find_middle(const Node* head, int* val);",
      code: `int doubly_find_middle(const Node* head, int* val) {
    if (!head) return 0;
    const Node* slow = head;
    const Node* fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    *val = slow->data;
    return 1;
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "middle"],
      aliases: ["doubly_find_middle", "findMiddleDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.remove-duplicates",
      name: "doubly_remove_duplicates",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/remove-duplicates",
      description: "Removes duplicate values from doubly linked list",
      signature: "void doubly_remove_duplicates(Node* head);",
      code: `void doubly_remove_duplicates(Node* head) {
    Node* cur = head;
    while (cur && cur->next) {
        Node* runner = cur->next;
        while (runner) {
            if (runner->data == cur->data) {
                Node* del = runner;
                runner = runner->next;
                if (del->prev) del->prev->next = del->next;
                if (del->next) del->next->prev = del->prev;
                free(del);
            } else {
                runner = runner->next;
            }
        }
        cur = cur->next;
    }
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "duplicates"],
      aliases: ["doubly_remove_duplicates", "removeDuplicatesDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.display-forward",
      name: "doubly_display_forward",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/display-forward",
      description: "Traverses doubly linked list forward and prints nodes",
      signature: "void doubly_display_forward(const Node* head);",
      code: `void doubly_display_forward(const Node* head) {
    const Node* cur = head;
    while (cur) {
        printf("%d <-> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\\n");
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "display", "forward"],
      aliases: ["doubly_display_forward", "displayForwardDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.display-backward",
      name: "doubly_display_backward",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/display-backward",
      description: "Traverses doubly linked list backward from tail to head",
      signature: "void doubly_display_backward(const Node* head);",
      code: `void doubly_display_backward(const Node* head) {
    if (!head) return;
    const Node* cur = head;
    while (cur->next) cur = cur->next;
    while (cur) {
        printf("%d <-> ", cur->data);
        cur = cur->prev;
    }
    printf("NULL\\n");
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "display", "backward"],
      aliases: ["doubly_display_backward", "displayBackwardDoubly"],
    }),
  ];
}

// =========================================================================
// 3. SINGLY CIRCULAR LINKED LIST EXPANSION
// =========================================================================
export function generateExpandedSinglyCircularComponents(): Component[] {
  const scNodeId = "data-structures.separate-components.linked-lists.singly-circular.node";
  const scCatId = "data-structures.separate-components.linked-lists.singly-circular";
  const scPath = "data-structures/separate-components/linked-lists/singly-circular";

  return [
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.create-node",
      name: "sc_create_node",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/create-node`,
      description: "Allocates a new node pointing to itself for circular linked list",
      signature: "Node* sc_create_node(int data);",
      code: `Node* sc_create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->next = n;
    return n;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "create"],
      aliases: ["sc_create_node", "createCircularNode"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.insert-beginning",
      name: "sc_insert_beginning",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/insert-beginning`,
      description: "Inserts node at the beginning of singly circular linked list",
      signature: "void sc_insert_beginning(Node** head, int data);",
      code: `void sc_insert_beginning(Node** head, int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->data = data;
    if (!*head) {
        n->next = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head) cur = cur->next;
    n->next = *head;
    cur->next = n;
    *head = n;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "insert", "beginning"],
      aliases: ["sc_insert_beginning", "insertBeginningCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.insert-at-position",
      name: "sc_insert_at_position",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/insert-at-position`,
      description: "Inserts node at 1-based position in singly circular linked list",
      signature: "int sc_insert_at_position(Node** head, int pos, int data);",
      code: `int sc_insert_at_position(Node** head, int pos, int data) {
    if (pos < 1) return 0;
    if (pos == 1) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return 0;
        n->data = data;
        if (!*head) {
            n->next = n;
            *head = n;
            return 1;
        }
        Node* last = *head;
        while (last->next != *head) last = last->next;
        n->next = *head;
        last->next = n;
        *head = n;
        return 1;
    }
    if (!*head) return 0;
    Node* cur = *head;
    for (int i = 1; cur->next != *head && i < pos - 1; i++) cur = cur->next;
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return 0;
    n->data = data;
    n->next = cur->next;
    cur->next = n;
    return 1;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "insert", "position"],
      aliases: ["sc_insert_at_position", "insertAtPositionCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.insert-before",
      name: "sc_insert_before",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/insert-before`,
      description: "Inserts node before target value in singly circular linked list",
      signature: "int sc_insert_before(Node** head, int target, int data);",
      code: `int sc_insert_before(Node** head, int target, int data) {
    if (!head || !*head) return 0;
    if ((*head)->data == target) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return 0;
        n->data = data;
        Node* last = *head;
        while (last->next != *head) last = last->next;
        n->next = *head;
        last->next = n;
        *head = n;
        return 1;
    }
    Node* cur = *head;
    while (cur->next != *head && cur->next->data != target) cur = cur->next;
    if (cur->next != *head && cur->next->data == target) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return 0;
        n->data = data;
        n->next = cur->next;
        cur->next = n;
        return 1;
    }
    return 0;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "insert", "before"],
      aliases: ["sc_insert_before", "insertBeforeCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.insert-after",
      name: "sc_insert_after",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/insert-after`,
      description: "Inserts node after target value in singly circular linked list",
      signature: "int sc_insert_after(Node* head, int target, int data);",
      code: `int sc_insert_after(Node* head, int target, int data) {
    if (!head) return 0;
    Node* cur = head;
    do {
        if (cur->data == target) {
            Node* n = (Node*)malloc(sizeof(Node));
            if (!n) return 0;
            n->data = data;
            n->next = cur->next;
            cur->next = n;
            return 1;
        }
        cur = cur->next;
    } while (cur != head);
    return 0;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "insert", "after"],
      aliases: ["sc_insert_after", "insertAfterCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.insert-sorted",
      name: "sc_insert_sorted",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/insert-sorted`,
      description: "Inserts value into ascending sorted circular singly linked list",
      signature: "void sc_insert_sorted(Node** head, int data);",
      code: `void sc_insert_sorted(Node** head, int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->data = data;
    if (!*head) {
        n->next = n;
        *head = n;
        return;
    }
    if (data <= (*head)->data) {
        Node* last = *head;
        while (last->next != *head) last = last->next;
        n->next = *head;
        last->next = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    cur->next = n;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "insert", "sorted"],
      aliases: ["sc_insert_sorted", "insertSortedCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.delete-beginning",
      name: "sc_delete_beginning",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/delete-beginning`,
      description: "Deletes head node of singly circular linked list",
      signature: "int sc_delete_beginning(Node** head, int* val);",
      code: `int sc_delete_beginning(Node** head, int* val) {
    if (!head || !*head) return 0;
    *val = (*head)->data;
    if ((*head)->next == *head) {
        free(*head);
        *head = NULL;
        return 1;
    }
    Node* last = *head;
    while (last->next != *head) last = last->next;
    Node* tmp = *head;
    *head = (*head)->next;
    last->next = *head;
    free(tmp);
    return 1;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "delete", "beginning"],
      aliases: ["sc_delete_beginning", "deleteBeginningCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.delete-end",
      name: "sc_delete_end",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/delete-end`,
      description: "Deletes tail node of singly circular linked list",
      signature: "int sc_delete_end(Node** head, int* val);",
      code: `int sc_delete_end(Node** head, int* val) {
    if (!head || !*head) return 0;
    if ((*head)->next == *head) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return 1;
    }
    Node* prev = NULL;
    Node* cur = *head;
    while (cur->next != *head) {
        prev = cur;
        cur = cur->next;
    }
    *val = cur->data;
    prev->next = *head;
    free(cur);
    return 1;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "delete", "end"],
      aliases: ["sc_delete_end", "deleteEndCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.delete-at-position",
      name: "sc_delete_at_position",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/delete-at-position`,
      description: "Deletes node at 1-based index in singly circular linked list",
      signature: "int sc_delete_at_position(Node** head, int pos, int* val);",
      code: `int sc_delete_at_position(Node** head, int pos, int* val) {
    if (!head || !*head || pos < 1) return 0;
    if (pos == 1) {
        *val = (*head)->data;
        if ((*head)->next == *head) {
            free(*head);
            *head = NULL;
            return 1;
        }
        Node* last = *head;
        while (last->next != *head) last = last->next;
        Node* tmp = *head;
        *head = (*head)->next;
        last->next = *head;
        free(tmp);
        return 1;
    }
    Node* prev = *head;
    for (int i = 1; prev->next != *head && i < pos - 1; i++) prev = prev->next;
    if (prev->next == *head) return 0;
    Node* cur = prev->next;
    *val = cur->data;
    prev->next = cur->next;
    free(cur);
    return 1;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "delete", "position"],
      aliases: ["sc_delete_at_position", "deleteAtPositionCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.delete-value",
      name: "sc_delete_value",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/delete-value`,
      description: "Deletes first occurrence of value in singly circular linked list",
      signature: "int sc_delete_value(Node** head, int val);",
      code: `int sc_delete_value(Node** head, int val) {
    if (!head || !*head) return 0;
    if ((*head)->data == val) {
        if ((*head)->next == *head) {
            free(*head);
            *head = NULL;
            return 1;
        }
        Node* last = *head;
        while (last->next != *head) last = last->next;
        Node* tmp = *head;
        *head = (*head)->next;
        last->next = *head;
        free(tmp);
        return 1;
    }
    Node* prev = *head;
    Node* cur = (*head)->next;
    while (cur != *head && cur->data != val) {
        prev = cur;
        cur = cur->next;
    }
    if (cur != *head) {
        prev->next = cur->next;
        free(cur);
        return 1;
    }
    return 0;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "delete", "value"],
      aliases: ["sc_delete_value", "deleteValueCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.delete-after",
      name: "sc_delete_after",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/delete-after`,
      description: "Deletes node immediately following target value in singly circular list",
      signature: "int sc_delete_after(Node** head, int target, int* val);",
      code: `int sc_delete_after(Node** head, int target, int* val) {
    if (!head || !*head) return 0;
    Node* cur = *head;
    do {
        if (cur->data == target) {
            if (cur->next == *head) {
                *val = (*head)->data;
                if ((*head)->next == *head) {
                    free(*head);
                    *head = NULL;
                    return 1;
                }
                Node* last = *head;
                while (last->next != *head) last = last->next;
                Node* tmp = *head;
                *head = (*head)->next;
                last->next = *head;
                free(tmp);
                return 1;
            }
            Node* del = cur->next;
            *val = del->data;
            cur->next = del->next;
            free(del);
            return 1;
        }
        cur = cur->next;
    } while (cur != *head);
    return 0;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "delete", "after"],
      aliases: ["sc_delete_after", "deleteAfterCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.search",
      name: "sc_search",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/search`,
      description: "Searches for value in singly circular linked list",
      signature: "Node* sc_search(Node* head, int val);",
      code: `Node* sc_search(Node* head, int val) {
    if (!head) return NULL;
    Node* cur = head;
    do {
        if (cur->data == val) return cur;
        cur = cur->next;
    } while (cur != head);
    return NULL;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "search"],
      aliases: ["sc_search", "searchCircularList"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.count",
      name: "sc_count",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/count`,
      description: "Counts total nodes in singly circular linked list",
      signature: "int sc_count(const Node* head);",
      code: `int sc_count(const Node* head) {
    if (!head) return 0;
    int cnt = 0;
    const Node* cur = head;
    do {
        cnt++;
        cur = cur->next;
    } while (cur != head);
    return cnt;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "count"],
      aliases: ["sc_count", "countCircularNodes"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.min-max",
      name: "sc_min_max",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/min-max`,
      description: "Finds minimum and maximum values in singly circular linked list",
      signature: "void sc_min_max(const Node* head, int* min_val, int* max_val);",
      code: `void sc_min_max(const Node* head, int* min_val, int* max_val) {
    if (!head) return;
    *min_val = head->data;
    *max_val = head->data;
    const Node* cur = head->next;
    while (cur != head) {
        if (cur->data < *min_val) *min_val = cur->data;
        if (cur->data > *max_val) *max_val = cur->data;
        cur = cur->next;
    }
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "min", "max"],
      aliases: ["sc_min_max", "minMaxCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.display",
      name: "sc_display",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/display`,
      description: "Displays elements in circular order",
      signature: "void sc_display(const Node* head);",
      code: `void sc_display(const Node* head) {
    if (!head) return;
    const Node* cur = head;
    do {
        printf("%d -> ", cur->data);
        cur = cur->next;
    } while (cur != head);
    printf("(head)\\n");
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "display"],
      aliases: ["sc_display", "displayCircularList"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.reverse",
      name: "sc_reverse",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/reverse`,
      description: "Reverses pointer direction in circular singly linked list",
      signature: "void sc_reverse(Node** head);",
      code: `void sc_reverse(Node** head) {
    if (!head || !*head || (*head)->next == *head) return;
    Node* prev = NULL;
    Node* cur = *head;
    Node* nxt = NULL;
    do {
        nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    } while (cur != *head);
    (*head)->next = prev;
    *head = prev;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "reverse"],
      aliases: ["sc_reverse", "reverseCircularList"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.sort",
      name: "sc_sort",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/sort`,
      description: "Sorts singly circular linked list in ascending order",
      signature: "void sc_sort(Node* head);",
      code: `void sc_sort(Node* head) {
    if (!head || head->next == head) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next != head) {
            if (cur->data > cur->next->data) {
                int tmp = cur->data;
                cur->data = cur->next->data;
                cur->next->data = tmp;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "sort"],
      aliases: ["sc_sort", "sortCircularList"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.remove-duplicates",
      name: "sc_remove_duplicates",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/remove-duplicates`,
      description: "Removes duplicate values from circular singly linked list",
      signature: "void sc_remove_duplicates(Node* head);",
      code: `void sc_remove_duplicates(Node* head) {
    if (!head || head->next == head) return;
    Node* cur = head;
    do {
        Node* prev = cur;
        Node* runner = cur->next;
        while (runner != head) {
            if (runner->data == cur->data) {
                prev->next = runner->next;
                free(runner);
                runner = prev->next;
            } else {
                prev = runner;
                runner = runner->next;
            }
        }
        cur = cur->next;
    } while (cur != head && cur->next != head);
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "duplicates"],
      aliases: ["sc_remove_duplicates", "removeDuplicatesCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.find-middle",
      name: "sc_find_middle",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/find-middle`,
      description: "Finds middle element in circular singly linked list",
      signature: "int sc_find_middle(const Node* head, int* val);",
      code: `int sc_find_middle(const Node* head, int* val) {
    if (!head) return 0;
    const Node* slow = head;
    const Node* fast = head;
    while (fast->next != head && fast->next->next != head) {
        slow = slow->next;
        fast = fast->next->next;
    }
    *val = slow->data;
    return 1;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "middle"],
      aliases: ["sc_find_middle", "findMiddleCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.split-halves",
      name: "sc_split_halves",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: scCatId,
      path: `${scPath}/split-halves`,
      description: "Splits circular singly linked list into two circular lists",
      signature: "void sc_split_halves(Node* head, Node** head1, Node** head2);",
      code: `void sc_split_halves(Node* head, Node** head1, Node** head2) {
    *head1 = NULL;
    *head2 = NULL;
    if (!head) return;
    Node* slow = head;
    Node* fast = head;
    while (fast->next != head && fast->next->next != head) {
        slow = slow->next;
        fast = fast->next->next;
    }
    if (fast->next->next == head) fast = fast->next;
    *head1 = head;
    if (head->next != head) *head2 = slow->next;
    fast->next = slow->next;
    slow->next = head;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "split"],
      aliases: ["sc_split_halves", "splitCircularHalves"],
    }),
  ];
}

// =========================================================================
// 4. DOUBLY CIRCULAR LINKED LIST EXPANSION
// =========================================================================
export function generateExpandedDoublyCircularComponents(): Component[] {
  const dcNodeId = "data-structures.separate-components.linked-lists.doubly-circular.node";
  const dcCatId = "data-structures.separate-components.linked-lists.doubly-circular";
  const dcPath = "data-structures/separate-components/linked-lists/doubly-circular";

  return [
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.create-node",
      name: "dc_create_node",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/create-node`,
      description: "Allocates a new doubly circular node pointing to itself",
      signature: "Node* dc_create_node(int data);",
      code: `Node* dc_create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->prev = n;
    n->next = n;
    return n;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "create"],
      aliases: ["dc_create_node", "createDoublyCircularNode"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.insert-beginning",
      name: "dc_insert_beginning",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/insert-beginning`,
      description: "Inserts node at the beginning of doubly circular linked list",
      signature: "void dc_insert_beginning(Node** head, int data);",
      code: `void dc_insert_beginning(Node** head, int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->data = data;
    if (!*head) {
        n->next = n;
        n->prev = n;
        *head = n;
        return;
    }
    Node* last = (*head)->prev;
    n->next = *head;
    n->prev = last;
    last->next = n;
    (*head)->prev = n;
    *head = n;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "insert", "beginning"],
      aliases: ["dc_insert_beginning", "insertBeginningDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.insert-at-position",
      name: "dc_insert_at_position",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/insert-at-position`,
      description: "Inserts node at 1-based position in doubly circular linked list",
      signature: "int dc_insert_at_position(Node** head, int pos, int data);",
      code: `int dc_insert_at_position(Node** head, int pos, int data) {
    if (pos < 1) return 0;
    if (pos == 1) {
        dc_insert_beginning(head, data);
        return 1;
    }
    if (!*head) return 0;
    Node* cur = *head;
    for (int i = 1; cur->next != *head && i < pos - 1; i++) cur = cur->next;
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return 0;
    n->data = data;
    n->next = cur->next;
    n->prev = cur;
    cur->next->prev = n;
    cur->next = n;
    return 1;
}`,
      dependencies: [dcNodeId, "data-structures.separate-components.linked-lists.doubly-circular.insert-beginning"],
      tags: ["linked-list", "doubly-circular", "insert", "position"],
      aliases: ["dc_insert_at_position", "insertAtPositionDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.insert-before",
      name: "dc_insert_before",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/insert-before`,
      description: "Inserts node before target value in doubly circular linked list",
      signature: "int dc_insert_before(Node** head, int target, int data);",
      code: `int dc_insert_before(Node** head, int target, int data) {
    if (!head || !*head) return 0;
    if ((*head)->data == target) {
        dc_insert_beginning(head, data);
        return 1;
    }
    Node* cur = (*head)->next;
    while (cur != *head && cur->data != target) cur = cur->next;
    if (cur != *head) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return 0;
        n->data = data;
        n->prev = cur->prev;
        n->next = cur;
        cur->prev->next = n;
        cur->prev = n;
        return 1;
    }
    return 0;
}`,
      dependencies: [dcNodeId, "data-structures.separate-components.linked-lists.doubly-circular.insert-beginning"],
      tags: ["linked-list", "doubly-circular", "insert", "before"],
      aliases: ["dc_insert_before", "insertBeforeDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.insert-after",
      name: "dc_insert_after",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/insert-after`,
      description: "Inserts node after target value in doubly circular linked list",
      signature: "int dc_insert_after(Node* head, int target, int data);",
      code: `int dc_insert_after(Node* head, int target, int data) {
    if (!head) return 0;
    Node* cur = head;
    do {
        if (cur->data == target) {
            Node* n = (Node*)malloc(sizeof(Node));
            if (!n) return 0;
            n->data = data;
            n->next = cur->next;
            n->prev = cur;
            cur->next->prev = n;
            cur->next = n;
            return 1;
        }
        cur = cur->next;
    } while (cur != head);
    return 0;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "insert", "after"],
      aliases: ["dc_insert_after", "insertAfterDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.insert-sorted",
      name: "dc_insert_sorted",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/insert-sorted`,
      description: "Inserts value in ascending sorted order in doubly circular list",
      signature: "void dc_insert_sorted(Node** head, int data);",
      code: `void dc_insert_sorted(Node** head, int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->data = data;
    if (!*head) {
        n->next = n;
        n->prev = n;
        *head = n;
        return;
    }
    if (data <= (*head)->data) {
        Node* last = (*head)->prev;
        n->next = *head;
        n->prev = last;
        last->next = n;
        (*head)->prev = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    n->prev = cur;
    cur->next->prev = n;
    cur->next = n;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "insert", "sorted"],
      aliases: ["dc_insert_sorted", "insertSortedDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.delete-beginning",
      name: "dc_delete_beginning",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/delete-beginning`,
      description: "Deletes head node of doubly circular linked list",
      signature: "int dc_delete_beginning(Node** head, int* val);",
      code: `int dc_delete_beginning(Node** head, int* val) {
    if (!head || !*head) return 0;
    *val = (*head)->data;
    if ((*head)->next == *head) {
        free(*head);
        *head = NULL;
        return 1;
    }
    Node* last = (*head)->prev;
    Node* nxt = (*head)->next;
    last->next = nxt;
    nxt->prev = last;
    free(*head);
    *head = nxt;
    return 1;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "delete", "beginning"],
      aliases: ["dc_delete_beginning", "deleteBeginningDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.delete-end",
      name: "dc_delete_end",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/delete-end`,
      description: "Deletes tail node of doubly circular linked list",
      signature: "int dc_delete_end(Node** head, int* val);",
      code: `int dc_delete_end(Node** head, int* val) {
    if (!head || !*head) return 0;
    if ((*head)->next == *head) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return 1;
    }
    Node* last = (*head)->prev;
    *val = last->data;
    Node* prev = last->prev;
    prev->next = *head;
    (*head)->prev = prev;
    free(last);
    return 1;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "delete", "end"],
      aliases: ["dc_delete_end", "deleteEndDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.delete-at-position",
      name: "dc_delete_at_position",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/delete-at-position`,
      description: "Deletes node at 1-based index in doubly circular linked list",
      signature: "int dc_delete_at_position(Node** head, int pos, int* val);",
      code: `int dc_delete_at_position(Node** head, int pos, int* val) {
    if (!head || !*head || pos < 1) return 0;
    if (pos == 1) {
        *val = (*head)->data;
        if ((*head)->next == *head) {
            free(*head);
            *head = NULL;
            return 1;
        }
        Node* last = (*head)->prev;
        Node* nxt = (*head)->next;
        last->next = nxt;
        nxt->prev = last;
        free(*head);
        *head = nxt;
        return 1;
    }
    Node* cur = *head;
    for (int i = 1; cur->next != *head && i < pos; i++) cur = cur->next;
    if (cur == *head) return 0;
    *val = cur->data;
    cur->prev->next = cur->next;
    cur->next->prev = cur->prev;
    free(cur);
    return 1;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "delete", "position"],
      aliases: ["dc_delete_at_position", "deleteAtPositionDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.delete-value",
      name: "dc_delete_value",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/delete-value`,
      description: "Deletes first occurrence of value in doubly circular linked list",
      signature: "int dc_delete_value(Node** head, int val);",
      code: `int dc_delete_value(Node** head, int val) {
    if (!head || !*head) return 0;
    if ((*head)->data == val) {
        if ((*head)->next == *head) {
            free(*head);
            *head = NULL;
            return 1;
        }
        Node* last = (*head)->prev;
        Node* nxt = (*head)->next;
        last->next = nxt;
        nxt->prev = last;
        free(*head);
        *head = nxt;
        return 1;
    }
    Node* cur = (*head)->next;
    while (cur != *head && cur->data != val) cur = cur->next;
    if (cur != *head) {
        cur->prev->next = cur->next;
        cur->next->prev = cur->prev;
        free(cur);
        return 1;
    }
    return 0;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "delete", "value"],
      aliases: ["dc_delete_value", "deleteValueDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.delete-after",
      name: "dc_delete_after",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/delete-after`,
      description: "Deletes node immediately following target value in doubly circular list",
      signature: "int dc_delete_after(Node** head, int target, int* val);",
      code: `int dc_delete_after(Node** head, int target, int* val) {
    if (!head || !*head) return 0;
    Node* cur = *head;
    do {
        if (cur->data == target) {
            if (cur->next == *head) {
                *val = (*head)->data;
                if ((*head)->next == *head) {
                    free(*head);
                    *head = NULL;
                    return 1;
                }
                Node* last = (*head)->prev;
                Node* nxt = (*head)->next;
                last->next = nxt;
                nxt->prev = last;
                free(*head);
                *head = nxt;
                return 1;
            }
            Node* del = cur->next;
            *val = del->data;
            cur->next = del->next;
            del->next->prev = cur;
            free(del);
            return 1;
        }
        cur = cur->next;
    } while (cur != *head);
    return 0;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "delete", "after"],
      aliases: ["dc_delete_after", "deleteAfterDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.search",
      name: "dc_search",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/search`,
      description: "Searches for value in doubly circular linked list",
      signature: "Node* dc_search(Node* head, int val);",
      code: `Node* dc_search(Node* head, int val) {
    if (!head) return NULL;
    Node* cur = head;
    do {
        if (cur->data == val) return cur;
        cur = cur->next;
    } while (cur != head);
    return NULL;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "search"],
      aliases: ["dc_search", "searchDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.count",
      name: "dc_count",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/count`,
      description: "Counts total nodes in doubly circular linked list",
      signature: "int dc_count(const Node* head);",
      code: `int dc_count(const Node* head) {
    if (!head) return 0;
    int cnt = 0;
    const Node* cur = head;
    do {
        cnt++;
        cur = cur->next;
    } while (cur != head);
    return cnt;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "count"],
      aliases: ["dc_count", "countDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.min-max",
      name: "dc_min_max",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/min-max`,
      description: "Finds minimum and maximum values in doubly circular list",
      signature: "void dc_min_max(const Node* head, int* min_val, int* max_val);",
      code: `void dc_min_max(const Node* head, int* min_val, int* max_val) {
    if (!head) return;
    *min_val = head->data;
    *max_val = head->data;
    const Node* cur = head->next;
    while (cur != head) {
        if (cur->data < *min_val) *min_val = cur->data;
        if (cur->data > *max_val) *max_val = cur->data;
        cur = cur->next;
    }
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "min", "max"],
      aliases: ["dc_min_max", "minMaxDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.display-forward",
      name: "dc_display_forward",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/display-forward`,
      description: "Traverses doubly circular linked list forward",
      signature: "void dc_display_forward(const Node* head);",
      code: `void dc_display_forward(const Node* head) {
    if (!head) return;
    const Node* cur = head;
    do {
        printf("%d <-> ", cur->data);
        cur = cur->next;
    } while (cur != head);
    printf("(head)\\n");
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "display", "forward"],
      aliases: ["dc_display_forward", "displayForwardDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.display-backward",
      name: "dc_display_backward",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/display-backward`,
      description: "Traverses doubly circular linked list backward from tail to head",
      signature: "void dc_display_backward(const Node* head);",
      code: `void dc_display_backward(const Node* head) {
    if (!head) return;
    const Node* cur = head->prev;
    do {
        printf("%d <-> ", cur->data);
        cur = cur->prev;
    } while (cur != head->prev);
    printf("(tail)\\n");
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "display", "backward"],
      aliases: ["dc_display_backward", "displayBackwardDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.reverse",
      name: "dc_reverse",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/reverse`,
      description: "Reverses doubly circular list by swapping prev and next pointers",
      signature: "void dc_reverse(Node** head);",
      code: `void dc_reverse(Node** head) {
    if (!head || !*head || (*head)->next == *head) return;
    Node* cur = *head;
    do {
        Node* tmp = cur->next;
        cur->next = cur->prev;
        cur->prev = tmp;
        cur = tmp;
    } while (cur != *head);
    *head = (*head)->prev;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "reverse"],
      aliases: ["dc_reverse", "reverseDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.sort",
      name: "dc_sort",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/sort`,
      description: "Sorts doubly circular linked list elements in ascending order",
      signature: "void dc_sort(Node* head);",
      code: `void dc_sort(Node* head) {
    if (!head || head->next == head) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next != head) {
            if (cur->data > cur->next->data) {
                int tmp = cur->data;
                cur->data = cur->next->data;
                cur->next->data = tmp;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "sort"],
      aliases: ["dc_sort", "sortDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.remove-duplicates",
      name: "dc_remove_duplicates",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/remove-duplicates`,
      description: "Removes duplicate values from doubly circular linked list",
      signature: "void dc_remove_duplicates(Node* head);",
      code: `void dc_remove_duplicates(Node* head) {
    if (!head || head->next == head) return;
    Node* cur = head;
    do {
        Node* runner = cur->next;
        while (runner != head) {
            if (runner->data == cur->data) {
                Node* del = runner;
                runner = runner->next;
                del->prev->next = del->next;
                del->next->prev = del->prev;
                free(del);
            } else {
                runner = runner->next;
            }
        }
        cur = cur->next;
    } while (cur != head && cur->next != head);
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "duplicates"],
      aliases: ["dc_remove_duplicates", "removeDuplicatesDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.find-middle",
      name: "dc_find_middle",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/find-middle`,
      description: "Finds middle node in doubly circular list using two pointers",
      signature: "int dc_find_middle(const Node* head, int* val);",
      code: `int dc_find_middle(const Node* head, int* val) {
    if (!head) return 0;
    const Node* slow = head;
    const Node* fast = head;
    while (fast->next != head && fast->next->next != head) {
        slow = slow->next;
        fast = fast->next->next;
    }
    *val = slow->data;
    return 1;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "middle"],
      aliases: ["dc_find_middle", "findMiddleDoublyCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.split-halves",
      name: "dc_split_halves",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: dcCatId,
      path: `${dcPath}/split-halves`,
      description: "Splits doubly circular list into two circular doubly lists",
      signature: "void dc_split_halves(Node* head, Node** head1, Node** head2);",
      code: `void dc_split_halves(Node* head, Node** head1, Node** head2) {
    *head1 = NULL;
    *head2 = NULL;
    if (!head) return;
    Node* slow = head;
    Node* fast = head;
    while (fast->next != head && fast->next->next != head) {
        slow = slow->next;
        fast = fast->next->next;
    }
    if (fast->next->next == head) fast = fast->next;
    *head1 = head;
    if (head->next != head) *head2 = slow->next;
    fast->next = slow->next;
    slow->next->prev = fast;
    slow->next = head;
    head->prev = slow;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "split"],
      aliases: ["dc_split_halves", "splitDoublyCircularHalves"],
    }),
  ];
}

// =========================================================================
// 5. ARRAYS, STACKS & QUEUES EXPANSION
// =========================================================================
export function generateExpandedArrayStackQueueComponents(): Component[] {
  const stackArrayStructId = "data-structures.separate-components.stacks.array-stack.struct";
  const linkedStackNodeId = "data-structures.separate-components.stacks.linked-stack.node";
  const linearQueueStructId = "data-structures.separate-components.queues.linear-queue.struct";
  const dequeStructId = "data-structures.separate-components.queues.deque.struct";

  return [
    // 1D Array additions
    createComponent({
      id: "data-structures.separate-components.arrays.1d-array.insert-at",
      name: "array_1d_insert_at",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.1d-array",
      path: "data-structures/separate-components/arrays/1d-array/insert-at",
      description: "Inserts element at specified index shifting succeeding elements right",
      signature: "int array_1d_insert_at(int* arr, int* n, int max_cap, int idx, int val);",
      code: `int array_1d_insert_at(int* arr, int* n, int max_cap, int idx, int val) {
    if (*n >= max_cap || idx < 0 || idx > *n) return 0;
    for (int i = *n; i > idx; i--) arr[i] = arr[i - 1];
    arr[idx] = val;
    (*n)++;
    return 1;
}`,
      tags: ["array", "1d", "insert"],
      aliases: ["array_1d_insert_at", "insert1DArray"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.1d-array.delete-at",
      name: "array_1d_delete_at",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.1d-array",
      path: "data-structures/separate-components/arrays/1d-array/delete-at",
      description: "Deletes element at specified index shifting succeeding elements left",
      signature: "int array_1d_delete_at(int* arr, int* n, int idx, int* deleted_val);",
      code: `int array_1d_delete_at(int* arr, int* n, int idx, int* deleted_val) {
    if (*n <= 0 || idx < 0 || idx >= *n) return 0;
    *deleted_val = arr[idx];
    for (int i = idx; i < *n - 1; i++) arr[i] = arr[i + 1];
    (*n)--;
    return 1;
}`,
      tags: ["array", "1d", "delete"],
      aliases: ["array_1d_delete_at", "delete1DArray"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.1d-array.linear-search",
      name: "array_1d_linear_search",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.1d-array",
      path: "data-structures/separate-components/arrays/1d-array/linear-search",
      description: "Performs sequential linear search on array",
      signature: "int array_1d_linear_search(const int* arr, int n, int target);",
      code: `int array_1d_linear_search(const int* arr, int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      tags: ["array", "1d", "search", "linear"],
      aliases: ["array_1d_linear_search", "linearSearch1D"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.1d-array.display",
      name: "array_1d_display",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.1d-array",
      path: "data-structures/separate-components/arrays/1d-array/display",
      description: "Prints elements of 1D array to stdout",
      signature: "void array_1d_display(const int* arr, int n);",
      code: `void array_1d_display(const int* arr, int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}`,
      tags: ["array", "1d", "display"],
      aliases: ["array_1d_display", "print1DArray"],
    }),

    // Array Stack additions
    createComponent({
      id: "data-structures.separate-components.stacks.array-stack.is-empty",
      name: "stack_is_empty",
      type: "function",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.array-stack",
      path: "data-structures/separate-components/stacks/array-stack/is-empty",
      description: "Checks if array-based stack is empty",
      signature: "bool stack_is_empty(const ArrayStack* s);",
      code: `bool stack_is_empty(const ArrayStack* s) {
    return s->top < 0;
}`,
      dependencies: [stackArrayStructId],
      tags: ["stack", "array-stack", "empty"],
      aliases: ["stack_is_empty", "isStackEmpty"],
    }),
    createComponent({
      id: "data-structures.separate-components.stacks.array-stack.is-full",
      name: "stack_is_full",
      type: "function",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.array-stack",
      path: "data-structures/separate-components/stacks/array-stack/is-full",
      description: "Checks if array-based stack is full",
      signature: "bool stack_is_full(const ArrayStack* s);",
      code: `bool stack_is_full(const ArrayStack* s) {
    return s->top >= s->capacity - 1;
}`,
      dependencies: [stackArrayStructId],
      tags: ["stack", "array-stack", "full"],
      aliases: ["stack_is_full", "isStackFull"],
    }),
    createComponent({
      id: "data-structures.separate-components.stacks.array-stack.display",
      name: "stack_display",
      type: "function",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.array-stack",
      path: "data-structures/separate-components/stacks/array-stack/display",
      description: "Displays array stack elements from top to bottom",
      signature: "void stack_display(const ArrayStack* s);",
      code: `void stack_display(const ArrayStack* s) {
    for (int i = s->top; i >= 0; i--) printf("%d ", s->data[i]);
    printf("\\n");
}`,
      dependencies: [stackArrayStructId],
      tags: ["stack", "array-stack", "display"],
      aliases: ["stack_display", "displayStack"],
    }),
    createComponent({
      id: "data-structures.separate-components.stacks.array-stack.count",
      name: "stack_count",
      type: "function",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.array-stack",
      path: "data-structures/separate-components/stacks/array-stack/count",
      description: "Returns count of elements in array-based stack",
      signature: "int stack_count(const ArrayStack* s);",
      code: `int stack_count(const ArrayStack* s) {
    return s->top + 1;
}`,
      dependencies: [stackArrayStructId],
      tags: ["stack", "array-stack", "count"],
      aliases: ["stack_count", "countStack"],
    }),

    // Linked Stack additions
    createComponent({
      id: "data-structures.separate-components.stacks.linked-stack.is-empty",
      name: "linked_stack_is_empty",
      type: "function",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.linked-stack",
      path: "data-structures/separate-components/stacks/linked-stack/is-empty",
      description: "Checks if linked stack is empty",
      signature: "bool linked_stack_is_empty(const StackNode* top);",
      code: `bool linked_stack_is_empty(const StackNode* top) {
    return top == NULL;
}`,
      dependencies: [linkedStackNodeId],
      tags: ["stack", "linked-stack", "empty"],
      aliases: ["linked_stack_is_empty", "isLinkedStackEmpty"],
    }),
    createComponent({
      id: "data-structures.separate-components.stacks.linked-stack.display",
      name: "linked_stack_display",
      type: "function",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.linked-stack",
      path: "data-structures/separate-components/stacks/linked-stack/display",
      description: "Displays elements of linked stack from top to bottom",
      signature: "void linked_stack_display(const StackNode* top);",
      code: `void linked_stack_display(const StackNode* top) {
    const StackNode* cur = top;
    while (cur) {
        printf("%d -> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\\n");
}`,
      dependencies: [linkedStackNodeId],
      tags: ["stack", "linked-stack", "display"],
      aliases: ["linked_stack_display", "displayLinkedStack"],
    }),
    createComponent({
      id: "data-structures.separate-components.stacks.linked-stack.count",
      name: "linked_stack_count",
      type: "function",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.linked-stack",
      path: "data-structures/separate-components/stacks/linked-stack/count",
      description: "Counts number of elements in linked stack",
      signature: "int linked_stack_count(const StackNode* top);",
      code: `int linked_stack_count(const StackNode* top) {
    int cnt = 0;
    const StackNode* cur = top;
    while (cur) {
        cnt++;
        cur = cur->next;
    }
    return cnt;
}`,
      dependencies: [linkedStackNodeId],
      tags: ["stack", "linked-stack", "count"],
      aliases: ["linked_stack_count", "countLinkedStack"],
    }),

    // Linear Queue additions
    createComponent({
      id: "data-structures.separate-components.queues.linear-queue.is-empty",
      name: "linear_queue_is_empty",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.linear-queue",
      path: "data-structures/separate-components/queues/linear-queue/is-empty",
      description: "Checks if linear queue is empty",
      signature: "bool linear_queue_is_empty(const LinearQueue* q);",
      code: `bool linear_queue_is_empty(const LinearQueue* q) {
    return q->front == -1 || q->front > q->rear;
}`,
      dependencies: [linearQueueStructId],
      tags: ["queue", "linear-queue", "empty"],
      aliases: ["linear_queue_is_empty", "isLinearQueueEmpty"],
    }),
    createComponent({
      id: "data-structures.separate-components.queues.linear-queue.is-full",
      name: "linear_queue_is_full",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.linear-queue",
      path: "data-structures/separate-components/queues/linear-queue/is-full",
      description: "Checks if linear queue is full",
      signature: "bool linear_queue_is_full(const LinearQueue* q);",
      code: `bool linear_queue_is_full(const LinearQueue* q) {
    return q->rear >= q->capacity - 1;
}`,
      dependencies: [linearQueueStructId],
      tags: ["queue", "linear-queue", "full"],
      aliases: ["linear_queue_is_full", "isLinearQueueFull"],
    }),
    createComponent({
      id: "data-structures.separate-components.queues.linear-queue.peek-rear",
      name: "linear_queue_peek_rear",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.linear-queue",
      path: "data-structures/separate-components/queues/linear-queue/peek-rear",
      description: "Retrieves rear element of linear queue without dequeuing",
      signature: "bool linear_queue_peek_rear(const LinearQueue* q, int* val);",
      code: `bool linear_queue_peek_rear(const LinearQueue* q, int* val) {
    if (q->front == -1 || q->front > q->rear) return false;
    *val = q->data[q->rear];
    return true;
}`,
      dependencies: [linearQueueStructId],
      tags: ["queue", "linear-queue", "peek", "rear"],
      aliases: ["linear_queue_peek_rear", "peekRearLinearQueue"],
    }),
    createComponent({
      id: "data-structures.separate-components.queues.linear-queue.display",
      name: "linear_queue_display",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.linear-queue",
      path: "data-structures/separate-components/queues/linear-queue/display",
      description: "Prints all elements in linear queue from front to rear",
      signature: "void linear_queue_display(const LinearQueue* q);",
      code: `void linear_queue_display(const LinearQueue* q) {
    if (q->front == -1 || q->front > q->rear) {
        printf("Queue empty\\n");
        return;
    }
    for (int i = q->front; i <= q->rear; i++) printf("%d ", q->data[i]);
    printf("\\n");
}`,
      dependencies: [linearQueueStructId],
      tags: ["queue", "linear-queue", "display"],
      aliases: ["linear_queue_display", "displayLinearQueue"],
    }),

    // Deque additions
    createComponent({
      id: "data-structures.separate-components.queues.deque.get-rear",
      name: "deque_get_rear",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.deque",
      path: "data-structures/separate-components/queues/deque/get-rear",
      description: "Returns rear element of double-ended queue",
      signature: "bool deque_get_rear(const Deque* dq, int* val);",
      code: `bool deque_get_rear(const Deque* dq, int* val) {
    if (dq->size == 0) return false;
    *val = dq->data[dq->rear];
    return true;
}`,
      dependencies: [dequeStructId],
      tags: ["queue", "deque", "rear"],
      aliases: ["deque_get_rear", "getRearDeque"],
    }),
    createComponent({
      id: "data-structures.separate-components.queues.deque.display",
      name: "deque_display",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.deque",
      path: "data-structures/separate-components/queues/deque/display",
      description: "Prints all elements in double-ended queue",
      signature: "void deque_display(const Deque* dq);",
      code: `void deque_display(const Deque* dq) {
    if (dq->size == 0) {
        printf("Deque empty\\n");
        return;
    }
    for (int i = 0; i < dq->size; i++) {
        int idx = (dq->front + i) % dq->capacity;
        printf("%d ", dq->data[idx]);
    }
    printf("\\n");
}`,
      dependencies: [dequeStructId],
      tags: ["queue", "deque", "display"],
      aliases: ["deque_display", "displayDeque"],
    }),
  ];
}

// =========================================================================
// 6. TREES EXPANSION (BST & AVL)
// =========================================================================
export function generateExpandedTreeComponents(): Component[] {
  const bstNodeId = "data-structures.separate-components.trees.bst.node";
  const bstCatId = "data-structures.separate-components.trees.bst";
  const bstPath = "data-structures/separate-components/trees/bst";

  const avlNodeId = "data-structures.separate-components.trees.avl.node";
  const avlCatId = "data-structures.separate-components.trees.avl";
  const avlPath = "data-structures/separate-components/trees/avl";

  return [
    // BST Additions
    createComponent({
      id: "data-structures.separate-components.trees.bst.inorder",
      name: "bst_inorder",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/inorder`,
      description: "Traverses BST in-order (Left, Root, Right) printing values",
      signature: "void bst_inorder(const Node* root);",
      code: `void bst_inorder(const Node* root) {
    if (!root) return;
    bst_inorder(root->left);
    printf("%d ", root->data);
    bst_inorder(root->right);
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "traversal", "inorder"],
      aliases: ["bst_inorder", "inorderBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.preorder",
      name: "bst_preorder",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/preorder`,
      description: "Traverses BST pre-order (Root, Left, Right) printing values",
      signature: "void bst_preorder(const Node* root);",
      code: `void bst_preorder(const Node* root) {
    if (!root) return;
    printf("%d ", root->data);
    bst_preorder(root->left);
    bst_preorder(root->right);
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "traversal", "preorder"],
      aliases: ["bst_preorder", "preorderBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.postorder",
      name: "bst_postorder",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/postorder`,
      description: "Traverses BST post-order (Left, Right, Root) printing values",
      signature: "void bst_postorder(const Node* root);",
      code: `void bst_postorder(const Node* root) {
    if (!root) return;
    bst_postorder(root->left);
    bst_postorder(root->right);
    printf("%d ", root->data);
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "traversal", "postorder"],
      aliases: ["bst_postorder", "postorderBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.levelorder",
      name: "bst_levelorder",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/levelorder`,
      description: "Breadth-first level order traversal of binary tree",
      signature: "void bst_levelorder(const Node* root);",
      code: `void bst_levelorder(const Node* root) {
    if (!root) return;
    const Node* queue[1024];
    int front = 0, rear = 0;
    queue[rear++] = root;
    while (front < rear) {
        const Node* cur = queue[front++];
        printf("%d ", cur->data);
        if (cur->left) queue[rear++] = cur->left;
        if (cur->right) queue[rear++] = cur->right;
    }
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "traversal", "levelorder", "bfs"],
      aliases: ["bst_levelorder", "levelorderBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.zigzag",
      name: "bst_zigzag",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/zigzag`,
      description: "Zigzag spiral level order traversal of binary tree",
      signature: "void bst_zigzag(const Node* root);",
      code: `void bst_zigzag(const Node* root) {
    if (!root) return;
    const Node* cur_lvl[512];
    const Node* nxt_lvl[512];
    int c_cnt = 0, n_cnt = 0;
    int l2r = 1;
    cur_lvl[c_cnt++] = root;
    while (c_cnt > 0) {
        for (int i = c_cnt - 1; i >= 0; i--) {
            const Node* cur = cur_lvl[i];
            printf("%d ", cur->data);
            if (l2r) {
                if (cur->left) nxt_lvl[n_cnt++] = cur->left;
                if (cur->right) nxt_lvl[n_cnt++] = cur->right;
            } else {
                if (cur->right) nxt_lvl[n_cnt++] = cur->right;
                if (cur->left) nxt_lvl[n_cnt++] = cur->left;
            }
        }
        for (int i = 0; i < n_cnt; i++) cur_lvl[i] = nxt_lvl[i];
        c_cnt = n_cnt;
        n_cnt = 0;
        l2r = !l2r;
    }
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "traversal", "zigzag"],
      aliases: ["bst_zigzag", "zigzagBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.boundary",
      name: "bst_boundary",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/boundary`,
      description: "Boundary traversal of binary tree (left, leaves, right)",
      signature: "void bst_boundary(const Node* root);",
      code: `static void bst_bound_leaves(const Node* root) {
    if (!root) return;
    bst_bound_leaves(root->left);
    if (!root->left && !root->right) printf("%d ", root->data);
    bst_bound_leaves(root->right);
}
static void bst_bound_left(const Node* root) {
    if (!root) return;
    if (root->left) {
        printf("%d ", root->data);
        bst_bound_left(root->left);
    } else if (root->right) {
        printf("%d ", root->data);
        bst_bound_left(root->right);
    }
}
static void bst_bound_right(const Node* root) {
    if (!root) return;
    if (root->right) {
        bst_bound_right(root->right);
        printf("%d ", root->data);
    } else if (root->left) {
        bst_bound_right(root->left);
        printf("%d ", root->data);
    }
}
void bst_boundary(const Node* root) {
    if (!root) return;
    printf("%d ", root->data);
    bst_bound_left(root->left);
    bst_bound_leaves(root->left);
    bst_bound_leaves(root->right);
    bst_bound_right(root->right);
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "traversal", "boundary"],
      aliases: ["bst_boundary", "boundaryBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.top-view",
      name: "bst_top_view",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/top-view`,
      description: "Top view traversal of binary tree using horizontal distance",
      signature: "void bst_top_view(const Node* root);",
      code: `typedef struct BSTQItemT {
    const Node* node;
    int hd;
} BSTQItemT;

void bst_top_view(const Node* root) {
    if (!root) return;
    int min_hd = 0, max_hd = 0;
    int map[2001];
    int filled[2001];
    for (int i = 0; i < 2001; i++) filled[i] = 0;

    BSTQItemT queue[1024];
    int front = 0, rear = 0;
    queue[rear++] = (BSTQItemT){ root, 0 };

    while (front < rear) {
        BSTQItemT item = queue[front++];
        int idx = item.hd + 1000;
        if (!filled[idx]) {
            filled[idx] = 1;
            map[idx] = item.node->data;
            if (item.hd < min_hd) min_hd = item.hd;
            if (item.hd > max_hd) max_hd = item.hd;
        }
        if (item.node->left) queue[rear++] = (BSTQItemT){ item.node->left, item.hd - 1 };
        if (item.node->right) queue[rear++] = (BSTQItemT){ item.node->right, item.hd + 1 };
    }

    for (int d = min_hd; d <= max_hd; d++) {
        if (filled[d + 1000]) printf("%d ", map[d + 1000]);
    }
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "traversal", "top-view"],
      aliases: ["bst_top_view", "topViewBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.bottom-view",
      name: "bst_bottom_view",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/bottom-view`,
      description: "Bottom view traversal of binary tree",
      signature: "void bst_bottom_view(const Node* root);",
      code: `typedef struct BSTQItemB {
    const Node* node;
    int hd;
} BSTQItemB;

void bst_bottom_view(const Node* root) {
    if (!root) return;
    int min_hd = 0, max_hd = 0;
    int map[2001];
    int filled[2001];
    for (int i = 0; i < 2001; i++) filled[i] = 0;

    BSTQItemB queue[1024];
    int front = 0, rear = 0;
    queue[rear++] = (BSTQItemB){ root, 0 };

    while (front < rear) {
        BSTQItemB item = queue[front++];
        int idx = item.hd + 1000;
        filled[idx] = 1;
        map[idx] = item.node->data;
        if (item.hd < min_hd) min_hd = item.hd;
        if (item.hd > max_hd) max_hd = item.hd;
        if (item.node->left) queue[rear++] = (BSTQItemB){ item.node->left, item.hd - 1 };
        if (item.node->right) queue[rear++] = (BSTQItemB){ item.node->right, item.hd + 1 };
    }

    for (int d = min_hd; d <= max_hd; d++) {
        if (filled[d + 1000]) printf("%d ", map[d + 1000]);
    }
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "traversal", "bottom-view"],
      aliases: ["bst_bottom_view", "bottomViewBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.morris-inorder",
      name: "bst_morris_inorder",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/morris-inorder`,
      description: "Morris in-order traversal using threaded binary tree with O(1) space",
      signature: "void bst_morris_inorder(Node* root);",
      code: `void bst_morris_inorder(Node* root) {
    Node* cur = root;
    while (cur) {
        if (!cur->left) {
            printf("%d ", cur->data);
            cur = cur->right;
        } else {
            Node* prev = cur->left;
            while (prev->right && prev->right != cur) prev = prev->right;
            if (!prev->right) {
                prev->right = cur;
                cur = cur->left;
            } else {
                prev->right = NULL;
                printf("%d ", cur->data);
                cur = cur->right;
            }
        }
    }
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "traversal", "morris", "inorder"],
      aliases: ["bst_morris_inorder", "morrisInorderBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.iterative-inorder",
      name: "bst_iterative_inorder",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/iterative-inorder`,
      description: "Non-recursive in-order traversal using explicit pointer stack",
      signature: "void bst_iterative_inorder(const Node* root);",
      code: `void bst_iterative_inorder(const Node* root) {
    const Node* stack[512];
    int top = -1;
    const Node* cur = root;
    while (cur || top != -1) {
        while (cur) {
            stack[++top] = cur;
            cur = cur->left;
        }
        cur = stack[top--];
        printf("%d ", cur->data);
        cur = cur->right;
    }
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "traversal", "iterative", "inorder"],
      aliases: ["bst_iterative_inorder", "iterativeInorderBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.iterative-preorder",
      name: "bst_iterative_preorder",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/iterative-preorder`,
      description: "Non-recursive pre-order traversal using explicit pointer stack",
      signature: "void bst_iterative_preorder(const Node* root);",
      code: `void bst_iterative_preorder(const Node* root) {
    if (!root) return;
    const Node* stack[512];
    int top = -1;
    stack[++top] = root;
    while (top != -1) {
        const Node* cur = stack[top--];
        printf("%d ", cur->data);
        if (cur->right) stack[++top] = cur->right;
        if (cur->left) stack[++top] = cur->left;
    }
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "traversal", "iterative", "preorder"],
      aliases: ["bst_iterative_preorder", "iterativePreorderBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.delete",
      name: "bst_delete",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/delete`,
      description: "Deletes node with key from BST handling all 3 structural cases",
      signature: "Node* bst_delete(Node* root, int val);",
      code: `static Node* bst_find_min_internal(Node* root) {
    while (root && root->left) root = root->left;
    return root;
}

Node* bst_delete(Node* root, int val) {
    if (!root) return NULL;
    if (val < root->data) {
        root->left = bst_delete(root->left, val);
    } else if (val > root->data) {
        root->right = bst_delete(root->right, val);
    } else {
        if (!root->left) {
            Node* tmp = root->right;
            free(root);
            return tmp;
        } else if (!root->right) {
            Node* tmp = root->left;
            free(root);
            return tmp;
        }
        Node* succ = bst_find_min_internal(root->right);
        root->data = succ->data;
        root->right = bst_delete(root->right, succ->data);
    }
    return root;
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "delete"],
      aliases: ["bst_delete", "deleteBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.find-min",
      name: "bst_find_min",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/find-min`,
      description: "Finds node with minimum value in BST",
      signature: "Node* bst_find_min(Node* root);",
      code: `Node* bst_find_min(Node* root) {
    while (root && root->left) root = root->left;
    return root;
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "find", "min"],
      aliases: ["bst_find_min", "findMinBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.find-max",
      name: "bst_find_max",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/find-max`,
      description: "Finds node with maximum value in BST",
      signature: "Node* bst_find_max(Node* root);",
      code: `Node* bst_find_max(Node* root) {
    while (root && root->right) root = root->right;
    return root;
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "find", "max"],
      aliases: ["bst_find_max", "findMaxBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.height",
      name: "bst_height",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/height`,
      description: "Computes maximum depth/height of binary tree",
      signature: "int bst_height(const Node* root);",
      code: `int bst_height(const Node* root) {
    if (!root) return 0;
    int lh = bst_height(root->left);
    int rh = bst_height(root->right);
    return (lh > rh ? lh : rh) + 1;
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "height"],
      aliases: ["bst_height", "heightBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.count-nodes",
      name: "bst_count_nodes",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/count-nodes`,
      description: "Recursively counts total number of nodes in binary tree",
      signature: "int bst_count_nodes(const Node* root);",
      code: `int bst_count_nodes(const Node* root) {
    if (!root) return 0;
    return 1 + bst_count_nodes(root->left) + bst_count_nodes(root->right);
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "count"],
      aliases: ["bst_count_nodes", "countNodesBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.leaf-count",
      name: "bst_leaf_count",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/leaf-count`,
      description: "Counts total number of leaf nodes in binary tree",
      signature: "int bst_leaf_count(const Node* root);",
      code: `int bst_leaf_count(const Node* root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1;
    return bst_leaf_count(root->left) + bst_leaf_count(root->right);
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "leaf", "count"],
      aliases: ["bst_leaf_count", "leafCountBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.mirror",
      name: "bst_mirror",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: bstCatId,
      path: `${bstPath}/mirror`,
      description: "Inverts binary tree by swapping left and right subtrees recursively",
      signature: "void bst_mirror(Node* root);",
      code: `void bst_mirror(Node* root) {
    if (!root) return;
    Node* tmp = root->left;
    root->left = root->right;
    root->right = tmp;
    bst_mirror(root->left);
    bst_mirror(root->right);
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "mirror", "invert"],
      aliases: ["bst_mirror", "mirrorBST"],
    }),

    // AVL Tree Additions
    createComponent({
      id: "data-structures.separate-components.trees.avl.rotate-left",
      name: "avl_rotate_left",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/rotate-left`,
      description: "Performs left rotation on unbalanced AVL node",
      signature: "Node* avl_rotate_left(Node* x);",
      code: `static int avl_hl_internal(const Node* n) { return n ? n->height : 0; }
static int avl_ml_internal(int a, int b) { return a > b ? a : b; }

Node* avl_rotate_left(Node* x) {
    Node* y = x->right;
    Node* t = y->left;
    y->left = x;
    x->right = t;
    x->height = avl_ml_internal(avl_hl_internal(x->left), avl_hl_internal(x->right)) + 1;
    y->height = avl_ml_internal(avl_hl_internal(y->left), avl_hl_internal(y->right)) + 1;
    return y;
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "rotation", "left"],
      aliases: ["avl_rotate_left", "rotateLeftAVL"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.rotate-right",
      name: "avl_rotate_right",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/rotate-right`,
      description: "Performs right rotation on unbalanced AVL node",
      signature: "Node* avl_rotate_right(Node* y);",
      code: `static int avl_hr_internal(const Node* n) { return n ? n->height : 0; }
static int avl_mr_internal(int a, int b) { return a > b ? a : b; }

Node* avl_rotate_right(Node* y) {
    Node* x = y->left;
    Node* t = x->right;
    x->right = y;
    y->left = t;
    y->height = avl_mr_internal(avl_hr_internal(y->left), avl_hr_internal(y->right)) + 1;
    x->height = avl_mr_internal(avl_hr_internal(x->left), avl_hr_internal(x->right)) + 1;
    return x;
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "rotation", "right"],
      aliases: ["avl_rotate_right", "rotateRightAVL"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.balance-factor",
      name: "avl_balance_factor",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/balance-factor`,
      description: "Calculates balance factor (height(left) - height(right)) of node",
      signature: "int avl_balance_factor(const Node* n);",
      code: `int avl_balance_factor(const Node* n) {
    if (!n) return 0;
    int lh = n->left ? n->left->height : 0;
    int rh = n->right ? n->right->height : 0;
    return lh - rh;
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "balance-factor"],
      aliases: ["avl_balance_factor", "balanceFactorAVL"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.height",
      name: "avl_height",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/height`,
      description: "Retrieves height of AVL node",
      signature: "int avl_height(const Node* n);",
      code: `int avl_height(const Node* n) {
    return n ? n->height : 0;
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "height"],
      aliases: ["avl_height", "heightAVL"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.search",
      name: "avl_search",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/search`,
      description: "Searches for value in balanced AVL tree in O(log n) time",
      signature: "Node* avl_search(Node* root, int val);",
      code: `Node* avl_search(Node* root, int val) {
    if (!root || root->data == val) return root;
    if (val < root->data) return avl_search(root->left, val);
    return avl_search(root->right, val);
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "search"],
      aliases: ["avl_search", "searchAVL"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.delete",
      name: "avl_delete",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/delete`,
      description: "Deletes node from AVL tree maintaining balanced invariant",
      signature: "Node* avl_delete(Node* root, int key);",
      code: `static int avl_del_h(const Node* n) { return n ? n->height : 0; }
static int avl_del_max(int a, int b) { return a > b ? a : b; }
static int avl_del_bf(const Node* n) { return n ? avl_del_h(n->left) - avl_del_h(n->right) : 0; }

static Node* avl_del_rr(Node* y) {
    Node* x = y->left;
    Node* t = x->right;
    x->right = y;
    y->left = t;
    y->height = avl_del_max(avl_del_h(y->left), avl_del_h(y->right)) + 1;
    x->height = avl_del_max(avl_del_h(x->left), avl_del_h(x->right)) + 1;
    return x;
}

static Node* avl_del_rl(Node* x) {
    Node* y = x->right;
    Node* t = y->left;
    y->left = x;
    x->right = t;
    x->height = avl_del_max(avl_del_h(x->left), avl_del_h(x->right)) + 1;
    y->height = avl_del_max(avl_del_h(y->left), avl_del_h(y->right)) + 1;
    return y;
}

Node* avl_delete(Node* root, int key) {
    if (!root) return NULL;
    if (key < root->data) root->left = avl_delete(root->left, key);
    else if (key > root->data) root->right = avl_delete(root->right, key);
    else {
        if (!root->left || !root->right) {
            Node* tmp = root->left ? root->left : root->right;
            if (!tmp) {
                tmp = root;
                root = NULL;
            } else {
                *root = *tmp;
            }
            free(tmp);
        } else {
            Node* cur = root->right;
            while (cur->left) cur = cur->left;
            root->data = cur->data;
            root->right = avl_delete(root->right, cur->data);
        }
    }
    if (!root) return NULL;
    root->height = 1 + avl_del_max(avl_del_h(root->left), avl_del_h(root->right));
    int balance = avl_del_bf(root);
    if (balance > 1 && avl_del_bf(root->left) >= 0) return avl_del_rr(root);
    if (balance > 1 && avl_del_bf(root->left) < 0) {
        root->left = avl_del_rl(root->left);
        return avl_del_rr(root);
    }
    if (balance < -1 && avl_del_bf(root->right) <= 0) return avl_del_rl(root);
    if (balance < -1 && avl_del_bf(root->right) > 0) {
        root->right = avl_del_rr(root->right);
        return avl_del_rl(root);
    }
    return root;
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "delete"],
      aliases: ["avl_delete", "deleteAVL"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.inorder",
      name: "avl_inorder",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/inorder`,
      description: "In-order traversal of AVL tree printing balance factor and height",
      signature: "void avl_inorder(const Node* root);",
      code: `void avl_inorder(const Node* root) {
    if (!root) return;
    avl_inorder(root->left);
    int lh = root->left ? root->left->height : 0;
    int rh = root->right ? root->right->height : 0;
    printf("%d(bf:%d,h:%d) ", root->data, lh - rh, root->height);
    avl_inorder(root->right);
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "inorder", "traversal"],
      aliases: ["avl_inorder", "inorderAVL"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.preorder",
      name: "avl_preorder",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/preorder`,
      description: "Pre-order traversal of AVL tree",
      signature: "void avl_preorder(const Node* root);",
      code: `void avl_preorder(const Node* root) {
    if (!root) return;
    printf("%d ", root->data);
    avl_preorder(root->left);
    avl_preorder(root->right);
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "preorder", "traversal"],
      aliases: ["avl_preorder", "preorderAVL"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.postorder",
      name: "avl_postorder",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/postorder`,
      description: "Post-order traversal of AVL tree",
      signature: "void avl_postorder(const Node* root);",
      code: `void avl_postorder(const Node* root) {
    if (!root) return;
    avl_postorder(root->left);
    avl_postorder(root->right);
    printf("%d ", root->data);
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "postorder", "traversal"],
      aliases: ["avl_postorder", "postorderAVL"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.levelorder",
      name: "avl_levelorder",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/levelorder`,
      description: "Level-order BFS traversal of AVL tree",
      signature: "void avl_levelorder(const Node* root);",
      code: `void avl_levelorder(const Node* root) {
    if (!root) return;
    const Node* queue[1024];
    int front = 0, rear = 0;
    queue[rear++] = root;
    while (front < rear) {
        const Node* cur = queue[front++];
        printf("%d ", cur->data);
        if (cur->left) queue[rear++] = cur->left;
        if (cur->right) queue[rear++] = cur->right;
    }
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "levelorder", "bfs"],
      aliases: ["avl_levelorder", "levelorderAVL"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.find-min",
      name: "avl_find_min",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/find-min`,
      description: "Finds minimum value node in AVL tree",
      signature: "Node* avl_find_min(Node* root);",
      code: `Node* avl_find_min(Node* root) {
    while (root && root->left) root = root->left;
    return root;
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "min"],
      aliases: ["avl_find_min", "findMinAVL"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.find-max",
      name: "avl_find_max",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/find-max`,
      description: "Finds maximum value node in AVL tree",
      signature: "Node* avl_find_max(Node* root);",
      code: `Node* avl_find_max(Node* root) {
    while (root && root->right) root = root->right;
    return root;
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "max"],
      aliases: ["avl_find_max", "findMaxAVL"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.is-balanced",
      name: "avl_is_balanced",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: avlCatId,
      path: `${avlPath}/is-balanced`,
      description: "Verifies if tree satisfies AVL height-balancing property at every node",
      signature: "int avl_is_balanced(const Node* root);",
      code: `static int avl_check_h(const Node* n, int* balanced) {
    if (!n) return 0;
    int lh = avl_check_h(n->left, balanced);
    int rh = avl_check_h(n->right, balanced);
    int diff = lh - rh;
    if (diff < -1 || diff > 1) *balanced = 0;
    return (lh > rh ? lh : rh) + 1;
}

int avl_is_balanced(const Node* root) {
    int balanced = 1;
    avl_check_h(root, &balanced);
    return balanced;
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "balance", "verify"],
      aliases: ["avl_is_balanced", "isBalancedAVL"],
    }),
  ];
}

// =========================================================================
// 7. GRAPHS & HASHING EXPANSION
// =========================================================================
export function generateExpandedGraphHashingComponents(): Component[] {
  const graphMatId = "data-structures.separate-components.graphs.adjacency-matrix.struct";
  const graphListNodeId = "data-structures.separate-components.graphs.adjacency-list.node";
  const graphListId = "data-structures.separate-components.graphs.adjacency-list.struct";
  const graphDsuId = "data-structures.separate-components.graphs.dsu.struct";
  const graphDsuFindId = "data-structures.separate-components.graphs.dsu.find";

  const chainNodeId = "data-structures.separate-components.hashing.chaining.node";
  const chainTableId = "data-structures.separate-components.hashing.chaining.struct";
  const openHashId = "data-structures.separate-components.hashing.open-addressing.struct";

  return [
    // Graph Matrix Additions
    createComponent({
      id: "data-structures.separate-components.graphs.adjacency-matrix.remove-edge",
      name: "graph_matrix_remove_edge",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-matrix",
      path: "data-structures/separate-components/graphs/adjacency-matrix/remove-edge",
      description: "Removes edge between vertices u and v in adjacency matrix",
      signature: "void graph_matrix_remove_edge(GraphMat* g, int u, int v);",
      code: `void graph_matrix_remove_edge(GraphMat* g, int u, int v) {
    if (u >= 0 && u < g->vertices && v >= 0 && v < g->vertices) {
        g->matrix[u][v] = 0;
        g->matrix[v][u] = 0;
    }
}`,
      dependencies: [graphMatId],
      tags: ["graphs", "adjacency-matrix", "remove", "edge"],
      aliases: ["graph_matrix_remove_edge", "removeEdgeGraphMatrix"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.adjacency-matrix.has-edge",
      name: "graph_matrix_has_edge",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-matrix",
      path: "data-structures/separate-components/graphs/adjacency-matrix/has-edge",
      description: "Checks if edge exists between vertices in adjacency matrix in O(1) time",
      signature: "int graph_matrix_has_edge(const GraphMat* g, int u, int v);",
      code: `int graph_matrix_has_edge(const GraphMat* g, int u, int v) {
    if (u >= 0 && u < g->vertices && v >= 0 && v < g->vertices) {
        return g->matrix[u][v] != 0;
    }
    return 0;
}`,
      dependencies: [graphMatId],
      tags: ["graphs", "adjacency-matrix", "has-edge"],
      aliases: ["graph_matrix_has_edge", "hasEdgeGraphMatrix"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.adjacency-matrix.bfs",
      name: "graph_matrix_bfs",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-matrix",
      path: "data-structures/separate-components/graphs/adjacency-matrix/bfs",
      description: "Breadth-first search traversal on adjacency matrix graph",
      signature: "void graph_matrix_bfs(const GraphMat* g, int start);",
      code: `void graph_matrix_bfs(const GraphMat* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    int* visited = (int*)calloc(g->vertices, sizeof(int));
    int* queue = (int*)malloc(g->vertices * sizeof(int));
    int front = 0, rear = 0;
    visited[start] = 1;
    queue[rear++] = start;
    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (int v = 0; v < g->vertices; v++) {
            if (g->matrix[u][v] && !visited[v]) {
                visited[v] = 1;
                queue[rear++] = v;
            }
        }
    }
    printf("\\n");
    free(visited);
    free(queue);
}`,
      dependencies: [graphMatId],
      tags: ["graphs", "adjacency-matrix", "bfs"],
      aliases: ["graph_matrix_bfs", "bfsGraphMatrix"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.adjacency-matrix.dfs",
      name: "graph_matrix_dfs",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-matrix",
      path: "data-structures/separate-components/graphs/adjacency-matrix/dfs",
      description: "Depth-first search traversal on adjacency matrix graph",
      signature: "void graph_matrix_dfs(const GraphMat* g, int start);",
      code: `static void graph_mat_dfs_rec(const GraphMat* g, int u, int* visited) {
    visited[u] = 1;
    printf("%d ", u);
    for (int v = 0; v < g->vertices; v++) {
        if (g->matrix[u][v] && !visited[v]) {
            graph_mat_dfs_rec(g, v, visited);
        }
    }
}

void graph_matrix_dfs(const GraphMat* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    int* visited = (int*)calloc(g->vertices, sizeof(int));
    graph_mat_dfs_rec(g, start, visited);
    printf("\\n");
    free(visited);
}`,
      dependencies: [graphMatId],
      tags: ["graphs", "adjacency-matrix", "dfs"],
      aliases: ["graph_matrix_dfs", "dfsGraphMatrix"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.adjacency-matrix.degrees",
      name: "graph_matrix_degrees",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-matrix",
      path: "data-structures/separate-components/graphs/adjacency-matrix/degrees",
      description: "Computes in-degree and out-degree of vertex in adjacency matrix",
      signature: "void graph_matrix_degrees(const GraphMat* g, int u, int* in_deg, int* out_deg);",
      code: `void graph_matrix_degrees(const GraphMat* g, int u, int* in_deg, int* out_deg) {
    *in_deg = 0;
    *out_deg = 0;
    if (u < 0 || u >= g->vertices) return;
    for (int i = 0; i < g->vertices; i++) {
        if (g->matrix[u][i]) (*out_deg)++;
        if (g->matrix[i][u]) (*in_deg)++;
    }
}`,
      dependencies: [graphMatId],
      tags: ["graphs", "adjacency-matrix", "degrees"],
      aliases: ["graph_matrix_degrees", "degreesGraphMatrix"],
    }),

    // Graph List Additions
    createComponent({
      id: "data-structures.separate-components.graphs.adjacency-list.remove-edge",
      name: "graph_list_remove_edge",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-list",
      path: "data-structures/separate-components/graphs/adjacency-list/remove-edge",
      description: "Removes directed edge from u to v in adjacency list",
      signature: "int graph_list_remove_edge(GraphList* g, int u, int v);",
      code: `int graph_list_remove_edge(GraphList* g, int u, int v) {
    if (u < 0 || u >= g->vertices) return 0;
    Node* cur = g->adj[u];
    Node* prev = NULL;
    while (cur && cur->dest != v) {
        prev = cur;
        cur = cur->next;
    }
    if (!cur) return 0;
    if (prev) prev->next = cur->next;
    else g->adj[u] = cur->next;
    free(cur);
    return 1;
}`,
      dependencies: [graphListId, graphListNodeId],
      tags: ["graphs", "adjacency-list", "remove", "edge"],
      aliases: ["graph_list_remove_edge", "removeEdgeGraphList"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.adjacency-list.has-edge",
      name: "graph_list_has_edge",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-list",
      path: "data-structures/separate-components/graphs/adjacency-list/has-edge",
      description: "Checks if edge exists in adjacency list",
      signature: "int graph_list_has_edge(const GraphList* g, int u, int v);",
      code: `int graph_list_has_edge(const GraphList* g, int u, int v) {
    if (u < 0 || u >= g->vertices) return 0;
    Node* cur = g->adj[u];
    while (cur) {
        if (cur->dest == v) return 1;
        cur = cur->next;
    }
    return 0;
}`,
      dependencies: [graphListId, graphListNodeId],
      tags: ["graphs", "adjacency-list", "has-edge"],
      aliases: ["graph_list_has_edge", "hasEdgeGraphList"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.adjacency-list.bfs",
      name: "graph_list_bfs",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-list",
      path: "data-structures/separate-components/graphs/adjacency-list/bfs",
      description: "BFS traversal of adjacency list graph",
      signature: "void graph_list_bfs(const GraphList* g, int start);",
      code: `void graph_list_bfs(const GraphList* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    int* visited = (int*)calloc(g->vertices, sizeof(int));
    int* queue = (int*)malloc(g->vertices * sizeof(int));
    int front = 0, rear = 0;
    visited[start] = 1;
    queue[rear++] = start;
    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        Node* cur = g->adj[u];
        while (cur) {
            if (!visited[cur->dest]) {
                visited[cur->dest] = 1;
                queue[rear++] = cur->dest;
            }
            cur = cur->next;
        }
    }
    printf("\\n");
    free(visited);
    free(queue);
}`,
      dependencies: [graphListId, graphListNodeId],
      tags: ["graphs", "adjacency-list", "bfs"],
      aliases: ["graph_list_bfs", "bfsGraphList"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.adjacency-list.dfs",
      name: "graph_list_dfs",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-list",
      path: "data-structures/separate-components/graphs/adjacency-list/dfs",
      description: "DFS traversal of adjacency list graph",
      signature: "void graph_list_dfs(const GraphList* g, int start);",
      code: `static void graph_list_dfs_rec(const GraphList* g, int u, int* visited) {
    visited[u] = 1;
    printf("%d ", u);
    Node* cur = g->adj[u];
    while (cur) {
        if (!visited[cur->dest]) graph_list_dfs_rec(g, cur->dest, visited);
        cur = cur->next;
    }
}

void graph_list_dfs(const GraphList* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    int* visited = (int*)calloc(g->vertices, sizeof(int));
    graph_list_dfs_rec(g, start, visited);
    printf("\\n");
    free(visited);
}`,
      dependencies: [graphListId, graphListNodeId],
      tags: ["graphs", "adjacency-list", "dfs"],
      aliases: ["graph_list_dfs", "dfsGraphList"],
    }),

    // Graph DSU Additions
    createComponent({
      id: "data-structures.separate-components.graphs.dsu.connected",
      name: "graph_dsu_connected",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.dsu",
      path: "data-structures/separate-components/graphs/dsu/connected",
      description: "Checks if two elements belong to the same disjoint set",
      signature: "int graph_dsu_connected(GraphDSU* dsu, int x, int y);",
      code: `int graph_dsu_connected(GraphDSU* dsu, int x, int y) {
    return graph_dsu_find(dsu, x) == graph_dsu_find(dsu, y);
}`,
      dependencies: [graphDsuId, graphDsuFindId],
      tags: ["graphs", "dsu", "connected"],
      aliases: ["graph_dsu_connected", "connectedDSU"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.dsu.count-sets",
      name: "graph_dsu_count_sets",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.dsu",
      path: "data-structures/separate-components/graphs/dsu/count-sets",
      description: "Counts total number of disjoint sets currently in DSU",
      signature: "int graph_dsu_count_sets(const GraphDSU* dsu);",
      code: `int graph_dsu_count_sets(const GraphDSU* dsu) {
    int cnt = 0;
    for (int i = 0; i < dsu->n; i++) {
        if (dsu->parent[i] == i) cnt++;
    }
    return cnt;
}`,
      dependencies: [graphDsuId],
      tags: ["graphs", "dsu", "count-sets"],
      aliases: ["graph_dsu_count_sets", "countSetsDSU"],
    }),

    // Hash Chaining Additions
    createComponent({
      id: "data-structures.separate-components.hashing.chaining.search",
      name: "chain_hash_search",
      type: "function",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.chaining",
      path: "data-structures/separate-components/hashing/chaining/search",
      description: "Searches key in separate chaining hash table",
      signature: "int chain_hash_search(const ChainHashTable* ht, const char* key, int* val);",
      code: `static unsigned long chain_hash_fn_search(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = (unsigned char)*s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

int chain_hash_search(const ChainHashTable* ht, const char* key, int* val) {
    unsigned long b = chain_hash_fn_search(key, ht->size);
    Node* cur = ht->buckets[b];
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            *val = cur->value;
            return 1;
        }
        cur = cur->next;
    }
    return 0;
}`,
      dependencies: [chainTableId, chainNodeId],
      tags: ["hashing", "chaining", "search"],
      aliases: ["chain_hash_search", "searchChainHash"],
    }),
    createComponent({
      id: "data-structures.separate-components.hashing.chaining.delete",
      name: "chain_hash_delete",
      type: "function",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.chaining",
      path: "data-structures/separate-components/hashing/chaining/delete",
      description: "Deletes key from separate chaining hash table",
      signature: "int chain_hash_delete(ChainHashTable* ht, const char* key, int* val);",
      code: `static unsigned long chain_hash_fn_del(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = (unsigned char)*s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

int chain_hash_delete(ChainHashTable* ht, const char* key, int* val) {
    unsigned long b = chain_hash_fn_del(key, ht->size);
    Node* cur = ht->buckets[b];
    Node* prev = NULL;
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            *val = cur->value;
            if (prev) prev->next = cur->next;
            else ht->buckets[b] = cur->next;
            free(cur);
            return 1;
        }
        prev = cur;
        cur = cur->next;
    }
    return 0;
}`,
      dependencies: [chainTableId, chainNodeId],
      tags: ["hashing", "chaining", "delete"],
      aliases: ["chain_hash_delete", "deleteChainHash"],
    }),
    createComponent({
      id: "data-structures.separate-components.hashing.chaining.load-factor",
      name: "chain_hash_load_factor",
      type: "function",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.chaining",
      path: "data-structures/separate-components/hashing/chaining/load-factor",
      description: "Calculates current load factor of separate chaining table",
      signature: "float chain_hash_load_factor(const ChainHashTable* ht);",
      code: `float chain_hash_load_factor(const ChainHashTable* ht) {
    if (ht->size == 0) return 0.0f;
    int items = 0;
    for (int i = 0; i < ht->size; i++) {
        Node* cur = ht->buckets[i];
        while (cur) {
            items++;
            cur = cur->next;
        }
    }
    return (float)items / ht->size;
}`,
      dependencies: [chainTableId, chainNodeId],
      tags: ["hashing", "chaining", "load-factor"],
      aliases: ["chain_hash_load_factor", "loadFactorChainHash"],
    }),

    // Hash Open Addressing Additions
    createComponent({
      id: "data-structures.separate-components.hashing.open-addressing.search",
      name: "open_hash_search",
      type: "function",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.open-addressing",
      path: "data-structures/separate-components/hashing/open-addressing/search",
      description: "Searches key with linear probing in open addressing hash table",
      signature: "int open_hash_search(const OpenHashTable* ht, const char* key, int* val);",
      code: `static unsigned long open_hash_calc_s(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = (unsigned char)*s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

int open_hash_search(const OpenHashTable* ht, const char* key, int* val) {
    unsigned long idx = open_hash_calc_s(key, ht->capacity);
    for (int i = 0; i < ht->capacity; i++) {
        int pos = (idx + i) % ht->capacity;
        if (!ht->entries[pos].occupied) return 0;
        if (strcmp(ht->entries[pos].key, key) == 0) {
            *val = ht->entries[pos].value;
            return 1;
        }
    }
    return 0;
}`,
      dependencies: [openHashId],
      tags: ["hashing", "open-addressing", "search"],
      aliases: ["open_hash_search", "searchOpenHash"],
    }),
    createComponent({
      id: "data-structures.separate-components.hashing.open-addressing.delete",
      name: "open_hash_delete",
      type: "function",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.open-addressing",
      path: "data-structures/separate-components/hashing/open-addressing/delete",
      description: "Deletes key from open addressing hash table",
      signature: "int open_hash_delete(OpenHashTable* ht, const char* key, int* val);",
      code: `static unsigned long open_hash_calc_d(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = (unsigned char)*s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

int open_hash_delete(OpenHashTable* ht, const char* key, int* val) {
    unsigned long idx = open_hash_calc_d(key, ht->capacity);
    for (int i = 0; i < ht->capacity; i++) {
        int pos = (idx + i) % ht->capacity;
        if (!ht->entries[pos].occupied) return 0;
        if (strcmp(ht->entries[pos].key, key) == 0) {
            *val = ht->entries[pos].value;
            ht->entries[pos].occupied = false;
            ht->count--;
            return 1;
        }
    }
    return 0;
}`,
      dependencies: [openHashId],
      tags: ["hashing", "open-addressing", "delete"],
      aliases: ["open_hash_delete", "deleteOpenHash"],
    }),

    // Hash Functions Additions
    createComponent({
      id: "data-structures.separate-components.hashing.hash-functions.sdbm",
      name: "hash_sdbm",
      type: "function",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.hash-functions",
      path: "data-structures/separate-components/hashing/hash-functions/sdbm",
      description: "Sleepycat Berkeley DB SDBM hash algorithm",
      signature: "unsigned long hash_sdbm(const char* str);",
      code: `unsigned long hash_sdbm(const char* str) {
    unsigned long hash = 0;
    int c;
    while ((c = (unsigned char)*str++)) {
        hash = c + (hash << 6) + (hash << 16) - hash;
    }
    return hash;
}`,
      tags: ["hashing", "sdbm", "string-hash"],
      aliases: ["hash_sdbm", "sdbmHash"],
    }),
    createComponent({
      id: "data-structures.separate-components.hashing.hash-functions.murmur32",
      name: "hash_murmur32",
      type: "function",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.hash-functions",
      path: "data-structures/separate-components/hashing/hash-functions/murmur32",
      description: "MurmurHash3 32-bit avalanche mixer",
      signature: "uint32_t hash_murmur32(const char* key, uint32_t seed);",
      code: `uint32_t hash_murmur32(const char* key, uint32_t seed) {
    uint32_t h = seed;
    uint32_t k;
    size_t len = strlen(key);
    const uint8_t* data = (const uint8_t*)key;
    const size_t nblocks = len / 4;
    for (size_t i = 0; i < nblocks; i++) {
        k = (uint32_t)data[i*4] | ((uint32_t)data[i*4+1] << 8) |
            ((uint32_t)data[i*4+2] << 16) | ((uint32_t)data[i*4+3] << 24);
        k *= 0xcc9e2d51;
        k = (k << 15) | (k >> 17);
        k *= 0x1b873593;
        h ^= k;
        h = (h << 13) | (h >> 19);
        h = h * 5 + 0xe6546b64;
    }
    k = 0;
    const uint8_t* tail = data + (nblocks * 4);
    switch (len & 3) {
        case 3: k ^= (uint32_t)tail[2] << 16;
        case 2: k ^= (uint32_t)tail[1] << 8;
        case 1: k ^= (uint32_t)tail[0];
                k *= 0xcc9e2d51;
                k = (k << 15) | (k >> 17);
                k *= 0x1b873593;
                h ^= k;
    }
    h ^= (uint32_t)len;
    h ^= h >> 16;
    h *= 0x85ebca6b;
    h ^= h >> 13;
    h *= 0xc2b2ae35;
    h ^= h >> 16;
    return h;
}`,
      tags: ["hashing", "murmur32", "string-hash"],
      aliases: ["hash_murmur32", "murmur32Hash"],
    }),
    createComponent({
      id: "data-structures.separate-components.hashing.hash-functions.polynomial",
      name: "hash_polynomial",
      type: "function",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.hash-functions",
      path: "data-structures/separate-components/hashing/hash-functions/polynomial",
      description: "Polynomial rolling hash with base 31 and prime modulo 10^9+9",
      signature: "uint64_t hash_polynomial(const char* str);",
      code: `uint64_t hash_polynomial(const char* str) {
    const int p = 31;
    const uint64_t m = 1000000009;
    uint64_t hash_val = 0;
    uint64_t p_pow = 1;
    while (*str) {
        hash_val = (hash_val + (*str - 'a' + 1) * p_pow) % m;
        p_pow = (p_pow * p) % m;
        str++;
    }
    return hash_val;
}`,
      tags: ["hashing", "polynomial", "string-hash"],
      aliases: ["hash_polynomial", "polynomialHash"],
    }),
  ];
}
