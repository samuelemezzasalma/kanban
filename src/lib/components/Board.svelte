<script lang="ts">
  import { board, cardHover, temporaryLane, lanes } from "$lib/stores";
  import { trpc, type Board } from "$lib/trcp/client";
  import { laneDragged, laneHoverDrag } from "../stores";
  import Swimlane from "./Swimlane.svelte";
  import { flip } from "svelte/animate";
  import { send, receive } from "../utils/transitions";

  /* INITIALIZING */

  let isLaneBeingAdded = false;

  /* UI */

  const enterSwimlaneMode = () => {
    isLaneBeingAdded = !isLaneBeingAdded;
  };

  function dropLane(event: DragEvent) {
    const json = event.dataTransfer?.getData("text/plain");
    if (json) {
      const data = JSON.parse(json);
      if ($board && $board?.swimlanes) {
        let lanes = [...$board?.swimlanes?.values()];
        const [item] = lanes.splice(data.laneDragged, 1);
        if (typeof laneHoverDrag === "number") {
          if (laneHoverDrag <= data.laneDragged) {
            lanes.splice(laneHoverDrag, 0, item);
          } else {
            lanes.splice(laneHoverDrag - 1, 0, item);
          }
        } else {
          lanes.push(item);
        }
        const lanesInMap = new Map();
        lanes.map((lane) => {
          if (lane.id) {
            lanesInMap.set(lane.id, lane);
          }
        });
        if (lanesInMap !== null && lanesInMap !== undefined) {
          $board.swimlanes = lanesInMap;
        }
      }
    }
    laneDragged.set(null);
    laneHoverDrag.set(null);
  }

  function startLaneDrag(event: DragEvent, laneIndex: number) {
    $laneDragged = laneIndex;
    const data = { laneDragged: laneIndex };
    event.dataTransfer?.setData("text/plain", JSON.stringify(data));
  }

  /* API */

  const addLane = async () => {
    if ($temporaryLane.isValid && $temporaryLane.lane) {
      if ($board !== null && $board.id && $board.id !== null) {
        const newBoard = await trpc().lanes.addLaneToBoard.mutate({
          boardId: $board?.id,
          lane: $temporaryLane.lane,
        });
        if (
          newBoard !== undefined &&
          newBoard !== null &&
          $board?.swimlanes
        ) {
          console.log(newBoard);
          board.set(newBoard);
        }
        enterSwimlaneMode();
      }
    }
  };
</script>

<div class="flex flex-col w-screen h-screen overflow-auto">
  <div class="px-10 mt-2">
    <button class="btn variant-filled-primary">
      {$board?.title}
    </button>

    <!-- <h2 class="text-l font-bold">{data?.board.title}</h2> -->
  </div>
  <div
    class="flex flex-grow px-10 mt-2 space-x-6 overflow-auto"
    on:drop={(event) => {
      if ($laneDragged !== null) {
        dropLane(event);
      }
    }}
    on:dragover|preventDefault={() => false}
  >
    {#if $lanes}
      {#each [...$lanes.values()] as swimlane, laneIndex (swimlane)}
        <!-- class="flex flex-row shrink-0 w-72" -->
        <div
          style={$laneHoverDrag !== null && laneIndex >= $laneHoverDrag
            ? `transform: translateX(18rem); transition-duration: 300ms;`
            : `transform: translateX(0px);`}
          draggable={true}
          on:dragstart={(event) => {
            if (!$cardHover) {
              startLaneDrag(event, laneIndex);
            }
          }}
          on:dragover|preventDefault={() => false}
          on:dragend={() => {
            laneHoverDrag.set(null);
          }}
          id={`lane-${laneIndex}`}
          in:receive={{ key: laneIndex }}
          out:send={{ key: laneIndex }}
          animate:flip
          class="box-border inline-block h-full align-top whitespace-no-wrap w-72"
        >
        <!-- boardId={$board?.id ?? ""} {swimlane} -->
          <Swimlane {laneIndex} laneId={swimlane.id}  />
        </div>
      {/each}
    {/if}
    {#if isLaneBeingAdded}
    <!-- TODO Settare correttamente laneIndex -->
      <!-- <Swimlane
        laneIndex={0}
        isLaneInAddingMode={isLaneBeingAdded}
        boardId={$board?.id ?? ""}
        swimlane={{
          title: "",
          cards: new Map([]),
          board_id: $board?.id ?? null,
        }}
        on:saveLane={addLane}
        on:exitAddLane={enterSwimlaneMode}
      /> -->
      <!-- <div class="flex items-center flex-shrink- h-10 px-2">
        <button
          class="btn variant-filled-primary bg-primary-500 w-52 text-sm h-6"
          on:click={addLane}
        >
          <span>Add a lane</span>
        </button>
        <button
          id="exitAdd"
          class="btn-icon variant-filled-primary rounded ml-auto btn-base text-sm h-6"
          on:click={enterSwimlaneMode}
        >
          <span><i class="fa-solid fa-xmark" /></span>
        </button>
      </div> -->
    {/if}
    {#if !isLaneBeingAdded}
      <div
        class="box-border inline-block h-full align-top whitespace-no-wrap w-72"
      >
        <div class="flex flex-col !w-full !max-h-full relative p-2">
          <button
            class="btn variant-filled-primary bg-primary-500 flex flex-grow text-sm h-6"
            on:click={enterSwimlaneMode}
          >
            <span><i class="fa-solid fa-plus" /></span>
            <span>Add another lane</span>
          </button>
        </div>
      </div>
    {/if}

    <div class="flex-shrink-0 w-6" />
  </div>
</div>

<style>
  /* your styles go here */
</style>
