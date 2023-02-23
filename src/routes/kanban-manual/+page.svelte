<script lang="ts">
  import { flip } from "svelte/animate";
  import { send, receive } from "../../lib/utils/transitions";

  let Board = [
    {
      name: "Random",
      items: ["React", "Angular", "Solid", "Rails", "Express", "Flask", "VPS"],
    },
    {
      name: "Frontend Stack",
      items: ["Svelte", "SvelteKit"],
    },
    {
      name: "Backend Stack",
      items: ["Django"],
    },
    {
      name: "Server Stack",
      items: ["Vercel"],
    },
  ];

  let draggedCardRect: DOMRect | undefined;

  $: draggedCardHeight = draggedCardRect?.height ?? 0;

  let cardHover: number | null = null;
  let laneHover: number | null = null;

  let laneHoverDrag: number | null = null;

  let laneDragged: number | null = null;
  let cardDragged: { laneIndex: number; cardIndex: number } | null;

  function dragLaneStart(event: DragEvent, laneIndex: number) {
    laneDragged = laneIndex;
    const data = { laneDragged: laneIndex };
    event.dataTransfer?.setData("text/plain", JSON.stringify(data));
  }
  function dropLane(event: DragEvent) {
    const json = event.dataTransfer?.getData("text/plain");
    if (json) {
      const data = JSON.parse(json);
      const [item] = Board.splice(data.laneDragged, 1);
      if (typeof laneHoverDrag === "number") {
        if (laneHoverDrag <= data.laneDragged) {
          Board.splice(laneHoverDrag, 0, item);
        } else {
          Board.splice(laneHoverDrag - 1, 0, item);
        }
      } else {
        Board.push(item);
      }
    }
    Board = [...Board];
    laneDragged = null;
    laneHoverDrag = null;
  }

  function dragStart(event: DragEvent, laneIndex: number, cardIndex: number) {
    const draggedElement = document.getElementById(
      `card-${laneIndex}-${cardIndex}`
    );
    if (draggedElement) {
      draggedCardRect = draggedElement?.getBoundingClientRect();
      cardDragged = { laneIndex, cardIndex };
      event.dataTransfer?.setData("text/plain", JSON.stringify(cardDragged));
    }
  }

  function drop(event: DragEvent, laneIndex: number) {
    /* const laneDropIndex = laneIndex
		const cardDropIndex = cardIndex */
    event.preventDefault();
    const json = event.dataTransfer?.getData("text/plain");
    if (json) {
      const data = JSON.parse(json);
      const [item] = Board[data.laneIndex].items.splice(data.cardIndex, 1);
      if (typeof cardHover === "number") {
        if (laneHover === data.laneIndex) {
          if (cardHover <= data.cardIndex) {
            Board[laneIndex].items.splice(cardHover, 0, item);
          } else {
            Board[laneIndex].items.splice(cardHover - 1, 0, item);
          }
        } else {
          console.log(cardHover)
          Board[laneIndex].items.splice(cardHover, 0, item);
        }
      } else {
        Board[laneIndex].items.push(item);
      }
    }
    cardDragged = null;
    Board = Board;
    laneHover = null;
    cardHover = null;
  }

</script>

<!-- Component Start -->
<div
  class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
>
  <div class="px-10 mt-6">
    <h1 class="text-2xl font-bold">Team Project Board</h1>
  </div>
  <!-- BOARD -->
  <div
    class="flex grow px-10 mt-4 space-x-6 overflow-auto"
    on:drop={(event) => {
      if (laneDragged !== null) {
        dropLane(event);
      }
    }}
    on:dragover|preventDefault={() => false}
  >
    <!-- COLUMN -->
    {#each Board as lane, laneIndex (lane)}
      <div
        style={laneHoverDrag !== null && (laneIndex >= laneHoverDrag)
          ? `transform: translateX(18rem); transition-duration: 300ms;`
          : `transform: translateX(0px);`}
        draggable={true}
        on:dragstart={(event) => {
          if (!cardHover) {
            dragLaneStart(event, laneIndex);
          }
        }}
        on:dragover|preventDefault={() => false}
        on:dragend={() => {
          laneHoverDrag = null;
        }}
        id={`lane-${laneIndex}`}
        class="flex flex-row shrink-0 w-72"
        in:receive={{ key: laneIndex }}
        out:send={{ key: laneIndex }}
        animate:flip
      >
      
        <div
          class="flex flex-row h-full w-3"
          on:dragenter|preventDefault={() => {
            if (laneDragged != null) {
              laneHoverDrag = laneIndex;
            }
          }}
        />

        <div class="flex flex-col w-full">
          <!-- COLUMN TITLE -->
          <div class="flex items-center flex-shrink-0 h-10 px-2 cursor-grab">
            <span class="block text-sm font-semibold cursor-default">{lane.name}</span>
            <span
              class="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
              >6</span
            >
            <button
              class="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100 cursor-default"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
          <!-- COLUMN CONTAINER -->
          <div
            class="flex flex-col grow pb-2 overflow-auto h-full"
            on:drop={(event) => {
              if (cardDragged !== null) {
                drop(event, laneIndex);
                event.stopPropagation();
              }
            }}
            on:dragover|preventDefault={() => false}
            on:dragenter|preventDefault={() => (laneHover = laneIndex)}
            on:dragend={() => {
              laneHover = null;
            }}
          >
            <!-- CARD -->
            {#each lane.items as card, cardIndex (card)}
              <div
                id={`card-${laneIndex}-${cardIndex}`}
                class="card"
                style={cardHover !== null &&
                laneIndex === laneHover &&
                cardIndex >= cardHover
                  ? `transform: translateY(${draggedCardHeight}px)`
                  : `transform: translateY(0px)`}
                in:receive={{ key: cardIndex }}
                out:send={{ key: cardIndex }}
                animate:flip={{ duration: 500 }}
              >
                <div
                  class="flex flex-col items-start p-4 mt-3  cursor-pointer"
                  draggable={true}
                  on:dragstart={(event) => {
                    dragStart(event, laneIndex, cardIndex);
                    event.stopPropagation();
                  }}
                  on:dragover|preventDefault={() => false}
                  on:dragend={() => {
                    cardHover = null;
                  }}
                >
                  <div
                    class="flex w-full"
                    on:dragenter|preventDefault={() => {
                      if (cardDragged) {
                        cardHover = cardIndex;
                      }
                    }}
                  >
                    <button
                      class="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
                    >
                      <svg
                        class="w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                        />
                      </svg>
                    </button>
                    <span
                      class="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full"
                      >Design</span
                    >
                  </div>

                  <h4 class="mt-3 text-sm font-medium">{card}</h4>
                  <div
                    on:dragleave={() => {
                      cardHover = null;
                    }}
                    class="flex items-center w-full mt-3 text-xs font-medium text-gray-400"
                  >
                    <div class="flex items-center">
                      <svg
                        class="w-4 h-4 text-gray-300 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="ml-1 leading-none">Dec 12</span>
                    </div>
                    <div class="relative flex items-center ml-4">
                      <svg
                        class="relative w-4 h-4 text-gray-300 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="ml-1 leading-none">4</span>
                    </div>
                    <div class="flex items-center ml-4">
                      <svg
                        class="w-4 h-4 text-gray-300 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="ml-1 leading-none">1</span>
                    </div>
                    <img
                      class="w-6 h-6 ml-auto rounded-full"
                      src="https://randomuser.me/api/portraits/women/26.jpg"
                    />
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        <div
          class="flex flex-row h-full w-3"
          on:dragleave={() => {
            laneHoverDrag = null;
          }}
        />
      </div>
    {/each}
    <div class="flex-shrink-0 w-6" />
  </div>
</div>
<!-- Component End -->
